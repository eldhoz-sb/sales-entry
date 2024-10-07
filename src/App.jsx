import React, { useState } from "react";
import HeaderSection from "./components/HeaderSection";
import DetailSection from "./components/DetailSection";
import ControlBar from "./components/ControlBar";
import {  useSelector } from "react-redux";
import { saveDataToServer } from "./services/api";
import html2pdf from "html2pdf.js";


function App() {

  const headerData = useSelector((state) => state.headerData);
  const detailData = useSelector((state) => state.detailData);
  const vr_no = useSelector((state) => state.headerData.vr_no);

  const [isSaveDisabled, setSaveDisabled] = useState(false);

  

  const handleNew = () => {
    // Log a message to check if the function is being called
    console.log("New button clicked");
    // Set the state to trigger the reset
    window.location.reload();
  };

 

  const handleSave = async () => {
    console.log('Save button clicked');

    const postData = {
      header_table: headerData,
      detail_table: detailData,
    };
  
    try {
      await saveDataToServer(postData);
      
      console.log('Data saved successfully');
      setSaveDisabled(true);

    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }
  };


  const handlePrint = () => {
    // Create a new element to contain the printable content
    const printableElement = document.createElement("div");
    printableElement.className = "printable-content";
  
   // Create a parent div for headerData
  const headerParentDiv = document.createElement("div");
  headerParentDiv.className = "header-parent-data";

  // Create div for the first three elements in headerData
  const firstThreeHeaderDiv = document.createElement("div");
  firstThreeHeaderDiv.className = "header-data";
  const firstThreeHeaderData = Object.keys(headerData).slice(0, 3);
  firstThreeHeaderData.forEach((key) => {
    const headerItem = document.createElement("p");
    headerItem.textContent = `${key}: ${headerData[key]}`;
    firstThreeHeaderDiv.appendChild(headerItem);
  });
  headerParentDiv.appendChild(firstThreeHeaderDiv);

  // Create div for the remaining elements in headerData
  const remainingHeaderDiv = document.createElement("div");
  remainingHeaderDiv.className = "header-data";
  const remainingHeaderData = Object.keys(headerData).slice(3);
  remainingHeaderData.forEach((key) => {
    const headerItem = document.createElement("p");
    headerItem.textContent = `${key}: ${headerData[key]}`;
    remainingHeaderDiv.appendChild(headerItem);
  });
  headerParentDiv.appendChild(remainingHeaderDiv);

  printableElement.appendChild(headerParentDiv);
  
  
    // Create a table for detailData
    const detailTable = document.createElement("table");
  detailData.forEach((detailItem, index) => {
    const detailTableRow = document.createElement("tr");
    for (const key in detailItem) {
      if (key !== "vr_no") {  // Exclude vr_no
        const detailCell = document.createElement("td");
        detailCell.textContent = `${key}: ${detailItem[key]}`;
        detailTableRow.appendChild(detailCell);
      }
    }
    detailTable.appendChild(detailTableRow);
  });
    printableElement.appendChild(detailTable);
  
    // Create a modal overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
  
    // Create a container for the PDF content and download button
    const pdfContainer = document.createElement("div");
    pdfContainer.className = "pdf-container";

  // Create a close button
  const closeButton = document.createElement("div");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => {
    // Remove the overlay when clicking the close button
    document.body.removeChild(overlay);
  });

  // Append the close button to the container
  pdfContainer.appendChild(closeButton);


    pdfContainer.appendChild(printableElement);
  
    // Create a download button
    const downloadButton = document.createElement("button");
    downloadButton.className = "download-button";
    downloadButton.textContent = "Download PDF";
    downloadButton.addEventListener("click", () => {
      // Generate PDF using html2pdf and trigger download
      html2pdf(printableElement, {
        margin: 10,
        filename: "your_file_name.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      });
    });

  
  
  // Append the download button to the container
  pdfContainer.appendChild(downloadButton);
  

  // Append the container to the overlay
  overlay.appendChild(pdfContainer);

  // Append the overlay to the body
  document.body.appendChild(overlay);
  };

  return (
    <div className="main">
      <div className="sections">
      <HeaderSection />
      <DetailSection  vr_no={vr_no} />
      </div>
      <ControlBar onNew={handleNew}  onSave={handleSave} onPrint={handlePrint} disabled={isSaveDisabled} />
    </div>
  );
}

export default App;
