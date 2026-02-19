import React, { useEffect, useState } from 'react'
import  helatchChecker  from '../../service/healthCheck'

function HealthChecker() {
    
    const [isOkay, setIsOkay] = useState(false)
    useEffect(() =>  {

        const fetchHealth = async()=> {
            try {
                    const result = await helatchChecker.healthCheck()
                    if(result.status === 200) {
                        setIsOkay(true)
                    }
                    console.log(result)
                } catch (error) {
                    console.log(error)
                }
        }
        fetchHealth()
    })

    if(isOkay == true) {return(
    <>
        <div className='text-4xl text-green-700 w-screen flex justify-center items-center'>
        Everything is working
        </div>
    </>
    )}

    return (

    <div className='text-4xl text-red-700 w-screen flex justify-center items-center'>
        Something is Wrong
    </div>

)

  
}

export default HealthChecker