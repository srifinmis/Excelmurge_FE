import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) return alert("Please upload both files");

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/upload', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Merged_output.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error processing files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '700px',
      margin: '60px auto',
      padding: '40px',
      borderRadius: '16px',
      background: '#f9fbfd',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      border: '3px solid #dbe2ea',
    },
    heading: {
      textAlign: 'center',
      color: '#1d3557',
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '35px',
    },
    formGroup: {
      marginBottom: '25px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 600,
      fontSize: '15px',
      color: '#2a2a2a',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccd6dd',
      borderRadius: '8px',
      fontSize: '15px',
      backgroundColor: '#fff',
      color: '#333',
      outline: 'none',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    button: {
      padding: '12px 30px',
      backgroundColor: '#0061a8',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'background-color 0.3s ease,transform 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#004b87',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Srifin Excel Merge Tool</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="file1" style={styles.label}>Upload LMS File</label>
          <input
            id="file1"
            type="file"
            onChange={(e) => setFile1(e.target.files[0])}
            style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="file2" style={styles.label}>Upload Zing-HR File</label>
          <input
            id="file2"
            type="file"
            onChange={(e) => setFile2(e.target.files[0])}
            style={styles.input} />
        </div>
        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading && { backgroundColor: '#6c757d', cursor: 'not-allowed' }),
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Merge & Download'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;