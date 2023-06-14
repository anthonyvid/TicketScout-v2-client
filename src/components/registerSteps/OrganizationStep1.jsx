// Components
import React from 'react';
import FlexContainer from '~/components/FlexContainer.jsx';
import PhoneInput from '~/components/PhoneInput.jsx';
import TextInput from '~/components/TextInput.jsx';

// hooks
import useClasses from '~/hooks/useClasses.js';

// Styles
import OrganizationStep1Styles from '~/styles/components/registerSteps/OrganizationStep1.style.js';

const OrganizationStep1 = ({
    control,
    errors,
    storeUrl,
    debouncedOnChange,
    uniqueStoreName,
    uniqueEmail,
    storeNameRebounce,
    emailRebounce
}) => {
    const classes = useClasses(OrganizationStep1Styles);

    return (
        <>
            <div className={classes.titleWrap}>
                <h1 className={classes.title}>Store Information</h1>
                <p className={classes.subtitle}>
                    Provide the following information about you and you're store
                </p>
            </div>
            <div className={classes.contentWrap}>
                <FlexContainer gap="25px">
                    <TextInput
                        staticLabel
                        fullWidth
                        label="Firstname"
                        placeholder="John"
                        name="firstname"
                        type="text"
                        control={control}
                        errors={errors}
                    />
                    <TextInput
                        staticLabel
                        fullWidth
                        placeholder="Smith"
                        label="Lastname"
                        name="lastname"
                        type="text"
                        control={control}
                        errors={errors}
                    />
                </FlexContainer>
                <FlexContainer gap="25px">
                    <TextInput
                        staticLabel
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        control={control}
                        errors={errors}
                        onChangeHandler={debouncedOnChange[1]}
                        uniqueDataValidation
                        isDataUnique={uniqueEmail}
                        uniqueData={emailRebounce}
                    />
                    <PhoneInput
                        fullWidth
                        staticLabel
                        label="Phone Number"
                        name="phoneNumber"
                        placeholder="123-456-7890"
                        control={control}
                        errors={errors}
                    />
                </FlexContainer>
                <FlexContainer gap="25px">
                    <TextInput
                        staticLabel
                        peekPassword
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        control={control}
                        errors={errors}
                    />
                    <TextInput
                        staticLabel
                        peekPassword
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        control={control}
                        errors={errors}
                    />
                </FlexContainer>
                <FlexContainer gap="25px">
                    <TextInput
                        staticLabel
                        fullWidth
                        label="Store Name"
                        name="storeName"
                        placeholder="Ticket Scout"
                        onChangeHandler={debouncedOnChange[0]}
                        type="text"
                        control={control}
                        errors={errors}
                        uniqueDataValidation
                        isDataUnique={uniqueStoreName}
                        uniqueData={storeNameRebounce}
                    />
                    <TextInput
                        staticLabel
                        fullWidth
                        label="Store URL"
                        placeholder={`https://${storeUrl}`}
                        type="text"
                        disabled
                        control={control}
                        errors={errors}
                    />
                </FlexContainer>
            </div>
        </>
    );
};

export default OrganizationStep1;
