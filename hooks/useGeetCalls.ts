import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>(() => {
    // Initialize calls from local storage or an empty array if not present
    const storedCalls = localStorage.getItem('calls');
    return storedCalls ? JSON.parse(storedCalls) : [];
    
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        // Fetch calls using queryCalls
        const { calls } = await client.queryCalls({
          
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
       
       // Filter out the calls that are marked for deletion
        const filteredCalls = calls.filter(call => !localStorage.getItem(`delete_${call.id}`));

        // Update local state with the filtered calls
        setCalls(filteredCalls);
      } catch (error) {
        console.error(error);
        setError("Error loading calls. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const deleteUpcomingCall = async (callId: string) => {
    
      // Mark the call for deletion in local storage
      localStorage.setItem(`delete_${callId}`, 'true');
      const updatedCalls = calls.filter(call => call.id !== callId);
      setCalls(updatedCalls);

      // Send a DELETE reque

  };

  const now = new Date();

  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading, error, deleteUpcomingCall };
};
