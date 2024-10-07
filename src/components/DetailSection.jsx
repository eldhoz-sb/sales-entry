import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addDetailRow,updateDetailsData } from '../store/actions';
import { updateAcAmt } from '../store/actions';
import { getItemData } from '../services/api';


const DetailSection = ({  vr_no }) => {
  
  const dispatch = useDispatch();
  const detailData = useSelector((state) => state.detailData)
  const [itemData, setItemData] = useState([])
  const [initialRowAdded, setInitialRowAdded] = useState(false);

  
  useEffect(() => {
    // Fetch item data
    const fetchItemData = async () => {
      try {
        const data = await getItemData();
        setItemData(data);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchItemData();
  }, []);
  
  const calculateTotalAmount = useCallback(() => {
    return detailData.reduce((total, row) => {
      const qty = parseFloat(row.qty) || 0;
      const rate = parseFloat(row.rate) || 0;
      return total + qty * rate;
    }, 0);
  }, [detailData]);
  
  useEffect(() => {
    // Calculate total amount when detailData changes
    const totalAmount = calculateTotalAmount();
    dispatch(updateAcAmt(totalAmount));
    dispatch(updateDetailsData(detailData));
  }, [calculateTotalAmount, detailData, dispatch]);


  useEffect(() => {
    // Add initial row when the component mounts and vr_no is received
    if (vr_no && !initialRowAdded) {
      const initialRow = { vr_no, sr_no: 1, item_code: '', item_name: '', description: '', qty: '', rate: '' };
      dispatch(addDetailRow(initialRow));
      setInitialRowAdded(true);
    }
  }, [dispatch, vr_no, initialRowAdded]);


  const handleInputChange = (e, rowIndex, columnName) => {
    const { value } = e.target;

    // Create a copy of the current detailData
    const updatedData = [...detailData];

    // Update the specific field in the corresponding row
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnName]: value,
    };

    // Dispatch the action with the updated detail data
    dispatch(updateDetailsData(updatedData));

    // Calculate total amount
    const totalAmount = calculateTotalAmount();
    dispatch(updateAcAmt(totalAmount));
  };



  const handleAddRow = () => {
    const newRowIndex = detailData.length + 1;
    const newRow = { vr_no, sr_no: newRowIndex, item_code: '', item_name: '', description: '', qty: '', rate: '' };
    dispatch(addDetailRow(newRow));
  };



  const renderRows = () => {
    return detailData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        <td>
          <input type="text" name={`sr_no_${rowIndex}`} value={row.sr_no} onChange={(e) => handleInputChange(e, rowIndex, 'sr_no')} readOnly />
        </td>
        <td>
          <select name={`item_code_${rowIndex}`} value={row.item_code} onChange={(e) => handleInputChange(e, rowIndex, 'item_code')} >
            <option value="">Select Item Code</option>
            {itemData.map((item) => (
              <option key={item.item_code} value={item.item_code}>
                {item.item_code}
              </option>
            ))}
          </select>
        </td>
        <td>
          <select name={`item_name_${rowIndex}`} value={row.item_name} onChange={(e) => handleInputChange(e, rowIndex, 'item_name')} >
            <option value="">Select Item Name</option>
            {itemData.map((item) => (
              <option key={item.item_code} value={item.item_name}>
                {item.item_name}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input type="text" name={`description_${rowIndex}`} value={row.description} onChange={(e) => handleInputChange(e, rowIndex, 'description')}  />
        </td>
        <td>
          <input type="text" name={`qty_${rowIndex}`} value={row.qty} onChange={(e) => handleInputChange(e, rowIndex, 'qty')}  />
        </td>
        <td>
          <input type="text" name={`rate_${rowIndex}`} value={row.rate} onChange={(e) => handleInputChange(e, rowIndex, 'rate')} />
        </td>
        <td>
          <input type='text' name='amt' value={parseFloat(row.qty) * parseFloat(row.rate) || 0} readOnly />
        </td>
      </tr>
    ));
  };

  const renderTotalAmount = () => {
    const totalAmount = calculateTotalAmount();
    return (
      <tr>
        <td colSpan="6" style={{ textAlign: 'right' }}>Total Amount:</td>
        <td>{totalAmount}</td>
      </tr>
    );
  };

  return (
    <div className='details-section'>
      <h2>DETAIL Section</h2>
      <table className='details-table'>
        <thead>
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">Item Code</th>
            <th scope="col">Item Name</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Rate</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
          {renderTotalAmount()}
        </tbody>
      </table>
      <button onClick={handleAddRow} style={{ margin: "10px 0px" }}>Add Row</button>
    </div>
  );
};

DetailSection.propTypes = {
  vr_no: PropTypes.number.isRequired, // Adjust the prop type as needed
};

export default connect(null, null)(DetailSection);
