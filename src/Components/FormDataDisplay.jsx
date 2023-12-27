import { useState } from "react";
import { GitButton, LinkdedInButton } from "./GitButton";
import PropTypes from "prop-types"
const FormDataDisplay = ({ formDataList, subGroupOptions }) => {
    const [nameFilter, setNameFilter] = useState("");
    const [subgroupFilter, setSubgroupFilter] = useState("");
    const filteredData = formDataList.filter(
        (data) =>

            data.firstName.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (subgroupFilter === "" || data.category === subgroupFilter)
    );

    return (
        <div >
            <div className="flex flex-col items-center justify-center mt-12 sm:gap-20 sm:flex-row poppins">
                <div className="mb-4">
                    <label className="mr-2">Filter by Name:</label>
                    <input className="h-16 text-center border-2 rounded-lg outline-none border-slate-100 placeholder:text-center focus:border-green-500 focus:border-2"
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Filter by Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="mr-2">Filter by Subgroup:</label>
                    <select className="h-16 px-5 border-2 rounded-lg border-slate-700 placeholder:text-center"
                        value={subgroupFilter}
                        onChange={(e) => setSubgroupFilter(e.target.value)}
                    >
                        <option >Select Subgroup</option>
                        {subGroupOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <div className="">
                    <ul className="flex items-center justify-between max-w-6xl mx-auto mb-4 font-bold bg-white rounded-lg poppins">
                        <li className="w-24 py-5 text-center rounded-l-lg">SI.No</li>
                        <li className="w-64 py-5 text-center ">Name</li>
                        <li className="w-64 py-5 text-center ">Subgroup</li>
                        <li className="w-64 py-5 text-center ">LinkedIn</li>
                        <li className="w-64 py-5 text-center rounded-r-lg ">GitHub</li>
                    </ul>

                    {filteredData.map((data, index) => (
                        <ul key={index} className="flex items-center justify-between max-w-6xl mx-auto mb-2 bg-white border-b-2 poppins">
                            <li className="w-24 py-5 text-center " >{index + 1}</li>
                            <li className="w-64 py-5 pl-16 text-left break-words">{data.firstName}</li>
                            <li className="w-64 py-5 text-center ">{data.category}</li>
                            <li className="flex justify-center w-64 py-5 text-center "><a href={data.LinkedIn} target="_blank" rel="noreferrer">
                                <LinkdedInButton />
                            </a></li>
                            <li className="flex justify-center w-64 py-5 text-center "><a href={data.github} target="_blank" rel="noreferrer">
                                <GitButton />
                            </a></li>
                        </ul>

                    ))}


                </div>
            </div>





        </div>
    );
};
FormDataDisplay.propTypes = {
    formDataList: PropTypes.array.isRequired, // Adjust the prop type accordingly
    subGroupOptions: PropTypes.array.isRequired,


}

export default FormDataDisplay;
