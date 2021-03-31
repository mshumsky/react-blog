import React, {useRef} from "react";
import {useTypedSelector} from "../redux";
import {ApiImage} from "../redux/reducers/user.reducer";
import {Button} from "@material-ui/core";

import {fileMatches} from "../utils";
import AddBoxIcon from "@material-ui/icons/AddBox";

const ProfileAvatarBox: React.FC = () => {
	const store = useTypedSelector(store => store.profile.data);
	const avatar = "avatar" in store ? store.avatar : {} as ApiImage;

	const fileRef = useRef<HTMLInputElement>(null);
	const accept = [".jpg", ".jpeg", ".png"];
	const acceptExp = /\.(jpg|jpeg|png)/i;

	const onClick = () => fileRef.current !== null && fileRef.current.click();

	const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		

		const file: File = e.currentTarget.files![0];
		const passed = fileMatches(file, {
			maxSize: 10, 
			extension: acceptExp,
			onFail: (filter) => {
				switch (filter) {
					case "maxSize":
						alert("Превышен допустимый размер файла.");
						break;
					case "extension":
						alert("Недопустимый формат файл.");
						break;
				}
			}
		});
		if (!passed) return;

		
		
	}
	
	return (
		<div className="Profile-AvatarBox">
			<div className="Profile-AvatarBox__ImageBox">
				<img className="Profile-AvatarBox__Image" src={avatar?.full_size}/>
			</div>					
			<Button className="Profile-AvatarBox__UploadButton" startIcon={<AddBoxIcon/>} onClick={onClick}>
				Загрузить фотографию
			</Button>
			<input ref={fileRef} type="file" onChange={onChange} accept={accept.join()} hidden/>
		</div>
	);
};

export default ProfileAvatarBox;