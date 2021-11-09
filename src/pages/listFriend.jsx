import ChatMenu from "../components/chatMenu";
import SettingMenu from "../components/settingMenu";

const ListFriend = (props) => {
	return (
		<div className='chatmenu-container fade-anim'>
			<div className="setting">
				<SettingMenu setstate={props.setstate} />
			</div>
			<ChatMenu />
		</div>
	);
};

export default ListFriend;
