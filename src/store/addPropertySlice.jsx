import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPropertyTypeSet: false,
  propertyType: null,
  current: 1,
  steps: [
    {
      id: 1,
      name: "Buying Options",
    },
    {
      id: 2,
      name: "Property Details",
    },
    {
      id: 3,
      name: "Property Features",
    },
  ],
};

const addPropertySlice = createSlice({
  name: "addProperty",
  initialState,
  reducers: {
    changeCurrentStep(state, { payload }) {
      state.current = payload;
    },
    nextStep(state) {
      const stepsLength = state.steps.length;
      const currentStep = state.current;
      state.current = currentStep < stepsLength ? currentStep + 1 : currentStep;
    },
    prevStep(state) {
      const currentStep = state.current;
      state.current = currentStep > 1 ? currentStep - 1 : currentStep;
    },
    setPropertyType(state, { payload }) {
      state.propertyType = payload;
    },
    setIsPropertyTypeSet(state, { payload }) {
      state.isPropertyTypeSet = payload;
    },
    reset() {
      return initialState;
    },
  },
});

export default addPropertySlice;
export const selectSteps = (state) => state.addProperty.steps;
export const selectCurrentStep = (state) => state.addProperty.current;
export const selectStepsLength = (state) => state.addProperty.steps.length;
export const selectPropertyType = (state) => state.addProperty.propertyType;
export const selectIsPropertyTypeSet = (state) =>
  state.addProperty.isPropertyTypeSet;

export const addPropertyActions = addPropertySlice.actions;
export const addPropertyReducer = addPropertySlice.reducer;
