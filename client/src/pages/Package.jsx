import { Card, Label } from '../components/UI';
import { useQuery } from '@apollo/client';
import { QUERY_PACKAGES } from '../utils/queries';
import PackageList from '../components/PackageList';
import useTranslation from "../components/customHooks/translation";

function Package() {

    const { loading, data } = useQuery(QUERY_PACKAGES);
    const packages = data?.packages || [];
    const translation = useTranslation();
    return (
        <div className="w-[90%] mx-auto grid grid-cols-5 gap-3 my-[90px]">
            <div className="h-[60%] border-2 rounded-lg p-2">
                <div className='my-4 text-center'>
                    <Label description={translation.filters}/>
                </div>
            </div>

            <div className="col-span-4 p-2">
                <div className='my-4'>
                    <Label description={translation.packages}/>
                </div>
                
                {loading ? (
                    <div>{translation.loading}...</div>
                ) : (
                    <PackageList
                    packages={packages}
                    />
                )}
                
            </div>
        </div>
        
    )
};

export default Package;