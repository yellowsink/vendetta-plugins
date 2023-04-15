import { Forms } from "@vendetta/ui/components";
import { getAssetIDByName } from "@vendetta/ui/assets";
import {ReactNative} from "@vendetta/metro/common";
const { FormSwitchRow, FormIcon } = Forms;

export default () => (
	<ReactNative.ScrollView>
	  <FormSwitchRow
	    label="Also hide muted users"
	    subLabel="Coming soon"
	    leading={<FormIcon source={getAssetIDByName("ic_notif_off")} />}
	    value={false}
	    onValueChange={() => {}}
	    disable
	  />
	</ReactNative.ScrollView>
);
