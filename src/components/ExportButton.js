import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Button,
  Stack,
  Typography,
  SvgIcon,
  Divider,
  Link,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';

const ExportButton = ({ data, columns }) => {
  const handleDownloadJSON = () => {
    const element = document.createElement('a');
    const textFile = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    element.download = 'react_table_data.json';
    document.body.appendChild(element);
    element.click();
  };

  const pdf_columns = columns.filter(
    (el) => el.accessor !== 'actions' && el.accessor !== 'avatar'
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const finalY = doc.lastAutoTable.finalY || 10;
    doc.text('React Table', 14, finalY + 15);
    doc.autoTable({
      startY: finalY + 20,
      theme: 'striped',
      columns: pdf_columns.map((col, index) => ({
        header: col.Header,
        dataKey: col.accessor,
      })),
      body: data,
    });
    doc.save('react_table_data.pdf');
  };

  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <Typography variant="subtitle1">Export as </Typography>
      <Button
        color="inherit"
        onClick={handleDownloadJSON}
        startIcon={
          <SvgIcon fontSize="small">
            <DownloadIcon />
          </SvgIcon>
        }
      >
        JSON
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button
        color="inherit"
        onClick={handleDownloadPDF}
        startIcon={
          <SvgIcon fontSize="small">
            <DownloadIcon />
          </SvgIcon>
        }
      >
        PDF
      </Button>
      <Typography variant="subtitle1"> or see </Typography>
      <Button
        color="inherit"
        href="https://github.com/ddharianto/react-table"
        target="_blank"
        rel="noopener"
        startIcon={
          <SvgIcon fontSize="small">
            <GitHubIcon />
          </SvgIcon>
        }
      >
        Source code
      </Button>
    </Stack>
  );
};

export default ExportButton;
