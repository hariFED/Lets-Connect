import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import FormDataDisplay from "./FormDataDisplay";



export function Form() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/getFormData");
                setFormDataList(response.data);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        };

        fetchData();
    }, []);



    const onSubmit = async (formData) => {
        // Check if GitHub or LinkedIn already exists in formDataList
        const isDuplicate = formDataList.some(
            (data) => data.github === formData.github || data.LinkedIn === formData.LinkedIn
        );

        if (isDuplicate) {
            alert("Data already exists. Please enter unique GitHub or LinkedIn.");
        } else {
            try {
                const response = await axios.post("http://localhost:5000/submitForm", formData);
                console.log("Data sent to backend:", response.data);

                // Update formDataList after successfully sending to the backend
                setFormDataList((prevData) => [...prevData, formData]);
                alert("Data saved successfully!");
            } catch (error) {
                console.error("Error sending data to backend:", error);
            }
        }
    };


    const subGroup = ["Deltas",
        "Axions",
        "Cosmions",
        "Singularity",
        "Tachyons",
        "Quasars",
        "Neutrinos",
        "Magnetars",
        "Leptoms",
        "Inflaton",
        "Hadrons",
        "Gravitinos",
        "Fermions",
        "Ecliptics",
        "Bosons"]
    console.log(subGroup.length)

    return (
        <div>
            <div className="flex items-center h-[80vh] justify-center pt-5 mx-auto poppins bg-[url('https://images.unsplash.com/photo-1545301699-e489a937bd26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                <form className="flex flex-col gap-5 p-14 bg-white min-w-[24rem] " onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="text-5xl font-black tracking-wider text-center ">WELCOME</h1>
                    <input className="h-16 p-5 border rounded-lg placeholder:text-center"  {...register("firstName", { required: true })} placeholder="Enter your Name" />
                    <select
                        className="flex flex-col h-16 gap-5 p-5 border rounded-lg"
                        {...register("category", { required: true })}
                    >
                        <option className="text-center" value="" disabled selected >
                            Select Your Group
                        </option>
                        {
                            subGroup.map((grpName, index) => {
                                return <option className="" value={grpName} key={index}>{`#${grpName}`}</option>

                            })
                        }
                    </select>
                    <label className="text-[12px]">Link Format:https:www.linkedin.com/in/yourprofilename/</label>
                    <input className="h-16 p-5 border rounded-lg placeholder:text-center" {...register("LinkedIn",
                        { required: true, pattern: /^https:\/\/www\.linkedin\.com\/in\/(.+)$/ })}
                        aria-invalid={errors.LinkedIn ? "true" : "false"}
                        placeholder="Paste your LinkdedIn Link here" />
                    {errors.LinkedIn ? <span>Please paste your correct LinkedIn address</span> : ""}
                    <label className="text-[12px]">Link Format:https:github.com/yourprofilename/</label>
                    <input className="h-16 p-5 border rounded-lg placeholder:text-center" {...register("github",
                        { required: true, pattern: /^https:\/\/github\.com\/(.+)$/ })}
                        aria-invalid={errors.github ? "true" : "false"}
                        placeholder="Paste your GitHub Link here" />
                    {errors.github ? <span>Please paste your correct github address</span> : ""}
                    <input className="px-24 py-4 mx-auto text-center text-white bg-black rounded-lg cursor-pointer hover:bg-white hover:text-black focus:border-2 focus:border-black" type="submit" />




                </form>


            </div>
            <FormDataDisplay formDataList={formDataList} subGroupOptions={subGroup} />
        </div>
    );
}