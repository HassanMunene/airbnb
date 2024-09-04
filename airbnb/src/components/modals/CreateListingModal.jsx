'use client';
{/*
This is the modal we will use to create a listing
*/}

import { useMemo, useState } from "react";
import BaseModal from "./BaseModal";
import useCreateListingModal from "@/app/hooks/useCreateListingModal";
import { categories } from "../navbar/Categories";
import CategoryInputElement from "../common/CategoryInputElement";
import { useForm } from "react-hook-form";
import SelectCountryDropdown from "../common/SelectCountryDropdown";

const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    INFO: 2,
    IMAGES: 3,
    DESCRIPTION: 4,
    PRICE: 5
}

const CreateListingModal = () => {
    const createListingModal = useCreateListingModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm({
        defaultValues: {
            category: '',
            locationValue: '',
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });
    
    //keep track of the category field
    const category = watch('category');
    const locationValue = watch('locationValue');

    //const allValues = watch();
    //console.log(allValues)

    //update and validate the value of a specific form field
    const handleCategoryChange = (categoryLabel) => {
        setValue('category', categoryLabel, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    };
    //update and validate locationValue field
    const handleLocationChange = (selectedValue) => {
        setValue('locationValue', selectedValue, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const goToPreviousStep = () => {
        setStep((value) => value - 1);
    }
    const goToNextStep = () => {
        setStep((value) => value + 1);
    }

    const primaryLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next'
    }, [step]);

    const secondaryLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    //body content when we are in step 0 choosing category
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <div className="text-start">
                <div className="font-bold text-2xl">Which of these best describes your place</div>
                <div className="font-medium text-neutral-500 mt-2">Pick a category</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInputElement 
                            onCategorySelect={handleCategoryChange}
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    //body content when we are in step 1 choosing location
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">Where is your place located?</div>
                    <div className="font-medium text-neutral-500 mt-2">Help guests find you!</div>
                </div>
                <SelectCountryDropdown
                    value={locationValue} 
                    onLocationChange={handleLocationChange}
                />
            </div>
        )
    }



    return (
        <BaseModal
            isOpen={createListingModal.isOpen}
            modalTitle="Airbnb your home"
            modalBody={bodyContent}
            onClose={createListingModal.onClose}
            primaryLabel={primaryLabel}
            secondaryLabel={secondaryLabel}
            handleSecondaryLabelSubmit={step === STEPS.CATEGORY ? undefined : goToPreviousStep}
            onSubmit={goToNextStep}
        />
    )
}

export default CreateListingModal;