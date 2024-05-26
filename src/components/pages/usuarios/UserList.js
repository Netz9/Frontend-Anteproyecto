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

function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <Container>
      <Title variant="h4">
        Lista de Usuarios
      </Title>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCellHeader align="center">Nombre de Usuario</TableCellHeader>
              <TableCellHeader align="center">Estado</TableCellHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id_usuario}>
                <TableCell align="center">{usuario.usuario}</TableCell>
                <TableCell align="center">{usuario.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </Container>
  );
}

export default UserList;
