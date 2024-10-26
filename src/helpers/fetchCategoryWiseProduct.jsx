import SummaryApi from "../common"


const fetchCategoryWiseProduct = async (category) =>{


        const fetchProduct = await fetch(SummaryApi.categoryWiseProduct.url,{
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                 "content-type" : "application/json"
            },
            body: JSON.stringify({
                category : category
            })
        })
        if (!fetchProduct.ok) {
            throw new Error(`Error: ${fetchProduct.statusText}`);
        }
        const dataResponse = await fetchProduct.json()


        return(dataResponse)
   


    
}

export default fetchCategoryWiseProduct