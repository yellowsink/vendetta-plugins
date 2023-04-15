import { findByName, findByProps } from "@vendetta/metro";
import { before, after } from "@vendetta/patcher";

export { default as settings } from "./Settings";

const VoiceUsers = findByName("VoiceUsers", false);
const RelationshipStore = findByProps("isBlocked");

const ChannelStore = findByProps("getChannel");
const ConnectedPrivateChannels = findByName("ConnectedPrivateChannels", false);

const unpatches = [
  // hide in VC
  before("default", VoiceUsers, ([props]) => {
    if (!Array.isArray(props?.voiceStates)) return;
    props.voiceStates = props.voiceStates.filter(
      (state) => !RelationshipStore.isBlocked(state.user.id)
    );
  }),

  // hide in DM list
  after("default", ConnectedPrivateChannels, ([props], ret) => {
    if (!ret?.type) return;

    before(
      "type",
      ret,
      ([args]) => {
        args.privateChannelIds = args.privateChannelIds.filter((cid) => {
          const channel = ChannelStore.getChannel(cid);
          return (
            channel.type !== 1 ||
            !RelationshipStore.isBlocked(channel.recipients[0])
          );
        });
      },
      true
    );
  }),
];

export const onUnload = () => unpatches.forEach((p) => p?.());
