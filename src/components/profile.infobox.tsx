import {TextField, TextFieldProps} from "@material-ui/core";
import {Formik} from "formik";
import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import * as yup from "yup";
import {profileSetChangedDataAction, useTypedSelector} from "../redux";
import {UserProfile} from "../redux/reducers/user.reducer";
import {invalidReplace} from "../utils";
import SwapField from "./swapfield";

const validSchema = yup.object().shape({
	username: yup.string().required("Это поле не может быть пустым :("),
	first_name: yup.string().max(16, "Не более 16 символов"),
	last_name: yup.string(),
	about: yup.string(),
	city: yup.string(),
	workplace: yup.string()
});

const FormField: React.FC = ({children}) =>
	<div className="Profile-InfoBox__FieldBox">
		{children}
	</div>;


const FieldValue: React.FC<{onClick?: any;}> = ({children, onClick}) =>
	<p className="Profile-InfoBox_FieldValue" onClick={onClick}>
		{children}
	</p>;

interface FieldInputProps {
	triggerActive?: any;
	submitForm: any;
	values?: any;
}

type FieldInputPropsType = TextFieldProps & FieldInputProps;

const FieldInput: React.FC<FieldInputPropsType> = (props) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		ref.current && ref.current.focus();
	}, []);

	const isValid = (data?: any) => validSchema.isValid(!data ? props.values : {...props.values, ...data});

	const onChange = (e: any): any => {
		const deliverToState = async () => {
			try {
				const data = {[e.currentTarget.name]: e.currentTarget.value};
				const valid = await isValid(data);
				valid && dispatch(profileSetChangedDataAction(data));
			} catch (err) {
				console.error("Failed in delivering profile changes to state.");
			}
		};
		deliverToState();
	};

	const textfieldProps = {...props};
	delete textfieldProps.triggerActive;
	delete textfieldProps.onClick;
	delete textfieldProps.submitForm;
	delete textfieldProps.values;

	textfieldProps.inputRef = ref;
	props.triggerActive && (() => {
		textfieldProps.onKeyDown = (e) => e.key === "Enter" && props.triggerActive();
		textfieldProps.onBlur = (e) => props.triggerActive() || props.onBlur && props.onBlur(e);
		textfieldProps.onChange = (e) => onChange(e) || props.onChange && props.onChange(e);
	})();

	return <TextField variant="filled" {...textfieldProps} />;
};

const ProfileInfoBox: React.FC = () => {
	const store = useTypedSelector(store => store.profile.data as UserProfile);

	const onSubmit = (values: any) => console.log(values);

	const packComp = (comp: any, values?: any) =>
		(triggerActive: any) => React.cloneElement(comp, {...comp.props, triggerActive, values});

	if (Object.keys(store).length <= 0) return null;

	return (
		<div className="Profile-InfoBox">
			<div className="Profile-InfoBox__FormBox">
				<Formik
					initialValues={store}
					validateOnChange
					onSubmit={onSubmit}
					validationSchema={validSchema}>
					{
						({values, errors, handleChange, handleBlur, submitForm}) => {
							return (
								<form onSubmit={e => e.preventDefault()} noValidate>
									<FormField>
										Имя пользователя
										<SwapField
											inactiveComp={<FieldValue>{invalidReplace(store.username, "Не указано")}</FieldValue>}
											activeComp={packComp(<FieldInput
												type="text"
												name="username"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.username}
												error={Boolean(errors.username)}
												label={errors.username}
												submitForm={submitForm}
											/>, values)}
										/>
									</FormField>
									<FormField>
										Настоящее имя
										<SwapField
											inactiveComp={<FieldValue>{invalidReplace(store.first_name, "Не указано")}</FieldValue>}
											activeComp={packComp(<FieldInput
												type="text"
												name="first_name"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.first_name}
												error={Boolean(errors.first_name)}
												label={errors.first_name}
												submitForm={submitForm}
											/>, values)}
										/>
									</FormField>
									<FormField>
										Фамилия
										<SwapField
											inactiveComp={<FieldValue>{invalidReplace(store.last_name, "Не указана")}</FieldValue>}
											activeComp={packComp(<FieldInput
												type="text"
												name="last_name"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.last_name}
												error={Boolean(errors.last_name)}
												label={errors.last_name}
												submitForm={submitForm}
											/>, values)}
										/>
									</FormField>
									<FormField>
										Родной город
										<SwapField
											inactiveComp={<FieldValue>{invalidReplace(store.city, "Не указан")}</FieldValue>}
											activeComp={packComp(<FieldInput
												type="text"
												name="city"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.city}
												error={Boolean(errors.city)}
												label={errors.city}
												submitForm={submitForm}
											/>, values)}
										/>
									</FormField>
									<FormField>
										Место работы
										<SwapField
											inactiveComp={<FieldValue>{invalidReplace(store.workplace, "Не указано")}</FieldValue>}
											activeComp={packComp(<FieldInput
												type="text"
												name="workplace"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.workplace}
												error={Boolean(errors.workplace)}
												label={errors.workplace}
												submitForm={submitForm}
											/>, values)}
										/>
									</FormField>
									<FormField>
										О себе
										<SwapField
											inactiveComp={<FieldValue>{invalidReplace(store.about, "Нет информации")}</FieldValue>}
											activeComp={packComp(<FieldInput
												type="text"
												name="about"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.about}
												error={Boolean(errors.about)}
												label={errors.about}
												submitForm={submitForm}
											/>, values)}
										/>
									</FormField>
								</form>
							);
						}
					}
				</Formik>
			</div>
		</div>
	);
};

export default ProfileInfoBox;