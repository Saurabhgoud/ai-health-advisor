import { useEffect, useState } from "react";
import api from "../api/axios.js";
import "./HealthReport.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function HealthReport() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    fetchHealthReport();
  }, []);
  const fetchHealthReport = async () => {
    try {
      const response = await api.get("/health-report");
      setRecords(response.data.records);
    } catch (error) {
      console.error(error);
    }
  };
  const downloadPDF = () => {
    if (records.length === 0) {
      alert("No health records available to download.");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Health Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Total Records: ${records.length}`, 14, 28);
    const tableData = records.map((record) => [
      new Date(record.recordedAt).toLocaleDateString(),
      `${record.weightKg} kg`,
      record.bmi,
      `${record.sleepGoalHours} hrs`
    ]);
    autoTable(doc, {
      startY: 35,
      head: [["Date", "Weight", "BMI", "Sleep"]],
      body: tableData
    });
    doc.save("health-report.pdf");
  };
  return <div className="health-report">
      <div className="health-report-header">
        <button className="download-pdf-button" onClick={downloadPDF}>
          ↓ Download PDF
        </button>
      </div>

      <div className="health-report-card">
        <div className="health-report-card-heading">
          <div>
            <h2>Health Records</h2>
            <p>Your recorded health metrics</p>
          </div>

          <span>{records.length} Records</span>
        </div>

        <div className="health-table-container">
          <table className="health-report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>BMI</th>
                <th>Sleep</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? records.map((record) => <tr key={record._id}>
                    <td>{new Date(record.recordedAt).toLocaleDateString()}</td>

                    <td>
                      <strong>{record.weightKg} kg</strong>
                    </td>

                    <td>
                      <span className="bmi-badge">{record.bmi}</span>
                    </td>

                    <td>{record.sleepGoalHours} hrs</td>
                  </tr>) : <tr>
                  <td colSpan="4" className="no-health-records">
                    No health records found.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
export default HealthReport;
