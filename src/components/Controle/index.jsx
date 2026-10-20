import React, { useState } from "react";
import "./style.css";

export default function Contador() {
    const [contador, setContador] = useState(0);
    const [passo, setPasso] = useState(1);
    const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);

    function alterarPasso(valor) {
        if (valor === "") {
            setPasso(1);
            return;
        }

        const numero = Number(valor);

        if (!Number.isFinite(numero)) {
            setPasso(1);
            return;
        }

        const passoValidado = Math.min(
            10,
            Math.max(1, Math.trunc(numero))
        );

        setPasso(passoValidado);
    }

    function incrementar() {
        setContador((valorAnterior) => {
            const novoValor = valorAnterior + passo;

            if (novoValor > 50) {
                return valorAnterior;
            }

            return novoValor;
        });
    }

    function decrementar() {
        setContador((valorAnterior) => {
            const novoValor = valorAnterior - passo;

            if (novoValor < 0) {
                return valorAnterior;
            }

            return novoValor;
        });
    }

    function resetar() {
        if (contador > 0) {
            setUltimoLoteRegistrado(contador);
        }

        setContador(0);
    }

    const status =
        contador === 50
            ? "completo"
            : contador >= 40
                ? "alerta"
                : "normal";

    const mensagemStatus =
        status === "completo"
            ? "Lote Fechado"
            : status === "alerta"
                ? "Capacidade quase atingida"
                : "Capacidade normal";

    return (
        <div className="card-exemplo">
            <div className="card-header">
                <span className="badge">Controle Industrial</span>
                <h3>Painel de Controle de Lotes</h3>
                <p>AutomaLog Soluções Logísticas</p>
            </div>

            <div className={`status-lote status-${status}`} role="status">
                <strong>{mensagemStatus}</strong>
                <span>
                    {contador} de 50 caixas
                </span>

                {status === "completo" && (
                    <span className="badge-fechado">
                        Lote Fechado
                    </span>
                )}
            </div>

            <div
                className="contador-display"
                aria-label={`Quantidade atual: ${contador} caixas`}
            >
                <span className="numero-contador">{contador}</span>
                <span className="unidade-contador">caixas</span>
            </div>

            <div className="progresso-container">
                <div
                    className={`progresso-barra progresso-${status}`}
                    style={{ width: `${(contador / 50) * 100}%` }}
                />
            </div>

            <p className="capacidade-texto">
                Capacidade utilizada: {contador * 2}%
            </p>

            <div className="passo-container">
                <label htmlFor="passo-input">
                    Passo de operação (1 a 10):
                </label>

                <input
                    type="number"
                    id="passo-input"
                    min="1"
                    max="10"
                    step="1"
                    value={passo}
                    onChange={(e) => alterarPasso(e.target.value)}
                />
            </div>

            <div className="botoes-grupo">
                <button
                    type="button"
                    className="btn btn-decrementar"
                    onClick={decrementar}
                    disabled={
                        contador === 0 ||
                        contador - passo < 0
                    }
                >
                    − {passo}
                </button>

                <button
                    type="button"
                    className="btn btn-resetar"
                    onClick={resetar}
                >
                    Finalizar / Zerar
                </button>

                <button
                    type="button"
                    className="btn btn-incrementar"
                    onClick={incrementar}
                    disabled={
                        contador === 50 ||
                        contador + passo > 50
                    }
                >
                    + {passo}
                </button>
            </div>

            <div className="historico-lote">
                <h4>Último lote registrado</h4>

                {ultimoLoteRegistrado !== null ? (
                    <p>
                        <strong>{ultimoLoteRegistrado} caixas</strong>
                        <span>Lote finalizado com sucesso.</span>
                    </p>
                ) : (
                    <p className="historico-vazio">
                        Nenhum lote finalizado nesta sessão.
                    </p>
                )}
            </div>

            <div className="explicacao-box">
                <strong>Regras operacionais</strong>
                <ul>
                    <li>Mínimo: 0 caixas.</li>
                    <li>Capacidade máxima: 50 caixas.</li>
                    <li>Passo permitido: de 1 a 10.</li>
                    <li>O último lote é preservado ao zerar.</li>
                </ul>
            </div>
        </div>
    );
}
