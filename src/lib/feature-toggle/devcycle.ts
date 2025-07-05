import { setupDevCycle } from "@devcycle/nextjs-sdk/server";

const getUserIdentity = async () => {
  return {
    user_id: "123",
  };
};

const { getVariableValue, getClientContext } = setupDevCycle({
  // Server and Client SDK Key. This will be public and sent to the client, so you MUST use the client SDK key.
  serverSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_SERVER_SDK_KEY ?? "",
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? "",
  // pass your method for getting the user identity
  userGetter: getUserIdentity,
  // pass any options you want to use for the DevCycle SDK
  options: {
    enableStreaming: false,
    eventFlushIntervalMS: 1000,
  },
});

export { getVariableValue, getClientContext };
