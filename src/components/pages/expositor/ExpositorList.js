import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const TableContainerStyled = styled(TableContainer)({
  maxWidth: 800,
  margin: 'auto',
  marginTop: 20,
});

const TableHeader = styled(TableHead)({
  backgroundColor: '#f5f5f5',
});

const TableCellHeader = styled(TableCell)({
  fontWeight: 'bold',
});

const Title = styled(Typography)({
  padding: 16,
  textAlign: 'center',
});

function ExpositorList() {
  const [expositores, setExpositores] = useState([]);

  useEffect(() => {
    const fetchExpositores = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/expositores');
        setExpositores(response.data);
      } catch (error) {
        console.error('Error al obtener expositores:', error);
      }
    };

    fetchExpositores();
  }, []);

  return (
    <Container>
      <Title variant="h4">
        Lista de Expositores
      </Title>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCellHeader align="center">Nombre</TableCellHeader>
              <TableCellHeader align="center">Apellido</TableCellHeader>
              <TableCellHeader align="center">Especialidad</TableCellHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expositores.map((expositor) => (
              <TableRow key={expositor.id_expositor}>
                <TableCell align="center">{expositor.nombre}</TableCell>
                <TableCell align="center">{expositor.apellido}</TableCell>
                <TableCell align="center">{expositor.especialidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </Container>
  );
}

export default ExpositorList;
