import { findByProps } from "@vendetta/metro";
import { before } from "@vendetta/patcher";

export const onUnload = before(
    "_sendMessage",
    findByProps("_sendMessage"),
    ([, msg]) => {
        msg.content = msg.content.replaceAll(
            /:\/\/twitter.com\/([a-zA-Z0-9_]+)\/status/g,
            "://vxtwitter.com/$1/status"
        );
    }
);