import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormData } from "../interfaces";
import { postLeadService } from "../../../services/leadService";
import { showSuccessAlert } from "@/util/sweetAlerts";

const ProspectForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    documentType: "cc",
    document: "",
    email: "",
    interestProgram: "free",
    full_name: "",
    mobile_phone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const steps = ["Información general", "Información de contacto", "Programa"];

  const validateStep = () => {
    const currentErrors: { [key: string]: string } = {};

    if (currentStep === 0) {
      if (!formData.firstName) currentErrors.firstName = "Los nombres son obligatorios";
      if (!formData.lastName) currentErrors.lastName = "Los apellidos som obligatorios";
      if (!formData.document) currentErrors.document = "El número de documento es obligatorio";
    }

    if (currentStep === 1) {
      if (!formData.mobile_phone) currentErrors.mobile_phone = "El teléfono es obligatorio";
      if (!formData.email) currentErrors.email = "El correo electrónico es obligatorio";
    }

    if (currentStep === 2) {
      if (!formData.interestProgram) currentErrors.interestProgram = "El programa es obligatorio";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 2));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      ["full_name"]: prevState.firstName + " " + prevState.lastName,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const responseAPI = await postLeadService.post(formData);
      console.log(responseAPI);
      if (responseAPI.status === "success" && responseAPI.code === 200) {
        await showSuccessAlert("Éxito", "Prospecto creado con éxito.");
        setFormData({} as FormData);
        setCurrentStep(0);
      }
    } catch (error) {
      await showSuccessAlert("Error", "Error al crear el prospecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Registro de prospecto</h2>
      <form className="space-y-4 flex">
        <div className="stepper-container w-[35%]">
          <ul className="steps steps-vertical w-full">
            {steps.map((label, index) => (
              <li key={index} data-content={currentStep > index ? "✓" : index + 1} className={`step ${currentStep >= index ? "step-info" : ""}`}>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="divider lg:divider-horizontal"></div>

        <div className="w-[65%] space-y-4">
          {currentStep === 0 && (
            <>
              {/* Nombres */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombres</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full p-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              {/* Apellidos */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full p-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>

              {/* Documento */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                <select name="documentType" value={formData.documentType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="cc">Cédula de Ciudadanía</option>
                  <option value="ti">Tarjeta de Identidad</option>
                  <option value="pp">Pasaporte</option>
                  <option value="nt">Número de Trámite</option>
                </select>
              </div>

              {/* Número de cédula*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
                <input type="text" name="document" value={formData.document} onChange={handleChange} className={`w-full p-2 border ${errors.document ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.document && <p className="text-red-500 text-sm">{errors.document}</p>}
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              {/* Teléfono*/}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="text" name="mobile_phone" value={formData.mobile_phone} onChange={handleChange} className={`w-full p-2 border ${errors.mobile_phone ? "border-red-500" : "border-gray-300"} rounded-md`} />
                  {errors.mobile_phone && <p className="text-red-500 text-sm">{errors.mobile_phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Programa Académico */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Seleccionar Programa</label>
                <select name="interestProgram" value={formData.interestProgram} onChange={handleChange} className={`w-full p-2 border ${errors.interestProgram ? "border-red-500" : "border-gray-300"} rounded-md`}>
                  <option value="507f1f77bcf86cd799439011">Free</option>
                  <option value="507f1f77bcf86cd799439011">Paid</option>
                </select>
                {errors.interestProgram && <p className="text-red-500 text-sm">{errors.interestProgram}</p>}
              </div>
            </>
          )}

          {/* Botones para pasos y Enviar */}
          <div className="flex justify-end mt-8 gap-4">
            {currentStep > 0 && (
              <button type="button" onClick={prevStep} className="py-2 px-4 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700">
                Anterior
              </button>
            )}

            {currentStep < 2 ? (
              <button type="button" onClick={nextStep} className="py-2 px-4 rounded-lg font-medium bg-[#00ADD9] hover:bg-[#1C92AD] text-white">
                Siguiente
              </button>
            ) : (
              <button type="button" className="py-2 px-4 rounded-lg font-medium bg-[#00ADD9] hover:bg-[#1C92AD] text-white" onClick={handleSubmit} disabled={loading}>
                {loading ? <span className="loading loading-spinner" /> : "Registrar Prospecto"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProspectForm;
