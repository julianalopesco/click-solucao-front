import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./DeletarServico.css";
import Servico from "../../../model/Servico";
import { buscaId, deleteId } from "../../../service/Service";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";



function DeletarServico() {
  const [servico, setServico] = useState<Servico[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/servicos/${id}`, setServico, {
      headers: {
        Authorization: token,
      },
    });
  }

  function sim() {
    navigate("/servicos");
    deleteId(`/servicos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    alert("Serviço deletado com sucesso");
  }

  function nao() {
    navigate("/servicos");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Serviço:
              </Typography>
              <Typography color="textSecondary">{servico?.nome}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarServico;
