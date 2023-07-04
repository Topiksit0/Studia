import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/accordion'

export const AccordionCourseContent = ({ courseContentInformation, setCourseSubsection, setCourseSection }) => {

    function handleSections(tituloSeccion, tituloSubseccion) {
        setCourseSection(tituloSeccion);
        setCourseSubsection(tituloSubseccion);
    }

    function selectFaseSectionContent(str) {
        if (str === "Forethought") {
            return (

                <span className="  text-xs absolute right-0 mr-20 font-medium px-2.5 py-0.5 rounded bg-green-800 text-white ">{str}</span>

            )
        } else if (str === "Performance") {
            return (

                <span className="text-xs absolute right-0 mr-20 font-medium px-2.5 py-0.5 rounded bg-yellow-600 text-white ">{str}</span>

            )
        } else if (str === "Self-reflection") {
            return (

                <span className="text-xs absolute right-0 mr-20 font-medium px-2.5 py-0.5 rounded bg-red-600 text-white ">{str}</span>

            )
        }
    }

    function convertirFecha(fecha) {
        const partes = fecha.split("-");
        return partes[2] + "-" + partes[1] + "-" + partes[0];
    }

    function RenderCourseInsideSectionContent(subsection, titulo) {
        if (new Date(convertirFecha(subsection.fecha_inicio)).toISOString() > new Date().toISOString()) {
            return (
                <div className='flex cursor-pointer my-1 hover:border-l-4 items-center py-3 '>
                    <p className='text-base font-normal ml-4 '>
                        <span>🔒 </span>
                    </p>
                    <span className='truncate w-2/4 ml-3'>{subsection.titulo}</span>
                    {selectFaseSectionContent(subsection.fase)}
                </div>
            )
        }
        return (
            <div className='flex cursor-pointer my-1 hover:border-l-4 items-center py-3 ' onClick={() => handleSections(titulo, subsection.titulo)}>
                <p className='text-base font-normal ml-4   '>
                    {subsection.finished === "False" ? (
                        <span role="img" aria-label="circle">⭕ </span>
                    ) : (
                        <span role="img" aria-label="checkmark">✅ </span>
                    )}

                </p>
                <span className='truncate w-2/4 ml-3'>{subsection.titulo}</span>
                {selectFaseSectionContent(subsection.fase)}
            </div>
        )
    }

    function RenderCourseContent(section) {
        return (
            <div>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <div className='container bg-gray-100 rounded py-4 mb-4 flex' >
                                <h2 className='text-lg font-medium   ml-4'>
                                    {section.titulo}
                                    <AccordionIcon className='absolute right-0 mr-20 ' />
                                </h2>
                            </div>
                        </AccordionButton>
                        <AccordionPanel>
                            {section.subsecciones.map(subseccion => RenderCourseInsideSectionContent(subseccion, section.titulo))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>

        )
    }

    return (
        <div className='flex-shrink-0 w-full sm:w-auto'>
            <div className='mt-8 bg-white rounded-lg  px-5 py-5  sm:mr-9 sm:right-0 sm:w-[30rem] w-full shadow-md sm:visible collapse'>
                <p className='text-xl font-medium'>Course content</p>
                <hr className="h-px my-8 bg-gray-400 border-0"></hr>
                {courseContentInformation.map(RenderCourseContent)}
            </div>
        </div>
    )
}
