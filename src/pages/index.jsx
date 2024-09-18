import Header from '@/Components/Header/Header';
import React from 'react';
import '../app/globals.css';
import ContestList from '@/Components/Contests/ContestLists';
import ModelList from '@/Components/Models/ModelLists';
const index = () => {
  return (
    <div>
      <ContestList />
      <ModelList />
    </div>
  );
};

export default index;