import CircularTable from '@/Components/CircularTable/CircularTable';
import { cicularData, circularData } from '@/Data/CircularData';
import React from 'react';

const index = () => {
      const data = React.useMemo(() => circularData, []); // Use the data
    return (
        <div>
            <h1 className='text-center mb-4'> Upcomming Job Circulars:</h1>
            <CircularTable data={data}/>
        </div>
    );
};

export default index;