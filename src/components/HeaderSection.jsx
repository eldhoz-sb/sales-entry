import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateHeaderData } from '../store/actions';
import { updateAcAmt } from '../store/actions';
import { getHeaderDetails } from '../services/api';

// Utility function to generate a random vr_no
const generateRandomVrNo = () => {
  return Math.floor(Math.random() * 1000) + 1; // Adjust the range as needed
};

const HeaderSection = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state) => state.headerData);

  // Use useSelector to get the latest ac_amt from the Redux store
  const acAmt = useSelector((state) => state.headerData.ac_amt);
  


  useEffect(() => {
    dispatch(updateHeaderData({ ac_amt: acAmt }));
  }, [acAmt, dispatch]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateHeaderData({ [name]: value }));
  };

  useEffect(() => {
    const fetchRandomVrNo = async () => {
      try {
        // Fetch existing vr_nos from the server
        const existingHeaderDetails = await getHeaderDetails();
  
        // Extract vr_nos from the existing details
        const existingVrNos = existingHeaderDetails.map((header) => parseInt(header.vr_no));
  
        console.log(existingVrNos)

        let randomVrNo;
  
        do {
          randomVrNo = generateRandomVrNo();
          console.log(randomVrNo)
        } while (existingVrNos.includes(randomVrNo));
  
        dispatch(updateHeaderData({ vr_no: randomVrNo }));
      } catch (error) {
        // Handle errors
        console.error('Error fetching existing header details:', error);
      }
    };
  
    fetchRandomVrNo();
  }, [dispatch]);


  /*const handleSubmit = () => {
    onSave({ headerData, detailData });
  };*/

  return (
    <div className='header-section'>
      <h2>HEADER Section</h2>
      <form className='header-table'>
        <div>
          <label>
            vr_no:
            <input type="text" name="vr_no" value={headerData.vr_no} readOnly />
          </label>
        </div>
        <div>
          <label>
            vr_date:
            <input type="text" name="vr_date" value={headerData.vr_date} readOnly />
          </label>
        </div>
        <div>
          <label>
            status:
            <select name="status" value={headerData.status} onChange={handleInputChange} >
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            ac_name:
            <input type="text" name="ac_name" value={headerData.ac_name} onChange={handleInputChange}   />
          </label>
        </div>
        <div>
          <label>
            ac_amt:
            <input type="text" name="ac_amt" value={acAmt} readOnly />
          </label>
        </div>
      </form>
    </div>
  );
};


export default connect(null, null)(HeaderSection);
