import React, { useState, useEffect } from 'react';
import './CoordinatorFeed.css';
import {
  LivestreamPlayer,
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  useCallStateHooks,
  ParticipantView,
  useCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "qy27ve6mpk4e"; // Replace with your Stream API key
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJAc3RyZWFtLWlvL2Rhc2hib2FyZCIsImlhdCI6MTczNjI0NTE5MywiZXhwIjoxNzM2MzMxNTkzLCJ1c2VyX2lkIjoiIWFub24iLCJyb2xlIjoidmlld2VyIiwiY2FsbF9jaWRzIjpbImxpdmVzdHJlYW06bGl2ZXN0cmVhbF8yYTU2OWY4Zi1hMjZjLTRlNWMtYjBjZC03NzNjMzUwZWJlODciXX0.EUhnkoexEQwdv-IpFy7m2MJFjrr01N5qjpirr6sk32k"; // Replace with your Stream token
const callId = "livestream_2a569f8f-a26c-4e5c-b0cd-773c350ebe87"; // Replace with your call ID

const userId = localStorage.getItem("userId");

const user = { id: userId };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);

const MyLivestreamUI = () => {
  const { useIsCallLive, useLocalParticipant, useParticipantCount } = useCallStateHooks();
  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();
  const call = useCall();

  return (
    <div className='big-div'>
      <div className='participants-box'>
        Live: {totalParticipants}
      </div>
      <div className='video-box'>
        {localParticipant && (
          <ParticipantView 
            participant={localParticipant}
            ParticipantViewUI={null}
          />
        )}
      </div>
      <div className='go-live'>
        {isCallLive ? (
          <button onClick={() => call?.stopLive()}>Stop Live</button>
        ) : (
          <button onClick={() => call?.startLive()}>Start Live</button>
        )}
      </div>
      <div id="live-stream">
        <LivestreamPlayer callType="livestream" callId={callId} />
      </div>
    </div>
  );
};

function CoordinatorFeed() {
  const [isLive, setIsLive] = useState(false);

  const handleLiveButtonClick = () => {
    setIsLive(true);
    call.join({ create: true }).catch((e) => {
      console.error("Failed to join call", e);
    });
    // Notify followers about the live streaming
    // This can be done via an API call to notify followers
  };

  useEffect(() => {
    return () => {
      call.leave().catch((e) => {
        console.error("Failed to leave call", e);
      });
    };
  }, []);

  return (
    <div>
      <h1>Coordinator Feed</h1>
      <button onClick={handleLiveButtonClick}>Go Live</button>
      {isLive && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <MyLivestreamUI />
          </StreamCall>
        </StreamVideo>
      )}
      <div id="campaigns">
        <button>Initiate Campaign</button>
        {/* List of active campaigns will be shown here */}
      </div>
      <div id="create-post">
        <button>Create Post</button>
        {/* Form to create a new post */}
      </div>
      <div id="posts">
        {/* List of posts will be shown here */}
      </div>
      <div id="catalog">
        {/* Section to share products or pets */}
      </div>
    </div>
  );
}

export default CoordinatorFeed;