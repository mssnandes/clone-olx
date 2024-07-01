import { Link, useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from "../../components/MainComponents/MainComponents";
import { PageArea, RedirectSignUpArea } from "./styled";
import { useState } from "react";
import OlxApi from "../../helpers/OlxApi";
import { doLogin } from "../../helpers/authHandlers";

export default function SignIn() {
  const api = OlxApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDisabled(true);
    setError('');
    const json = await api.login(email, password, navigate);
    if (json.error) {
      setError(json.error.msg);
      setDisabled(false);
    } else {
      doLogin(json.token, rememberPassword);
      navigate('/');
    }
  };

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        {error && 
          <ErrorMessage>{error}</ErrorMessage>
        }
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Email</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                required
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar senha</div>
            <div className="area--input">
              <input
                type="checkbox"
                className="check"
                disabled={disabled}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button type="submit" disabled={disabled}>
                Entrar
              </button>
            </div>
          </label>
          <RedirectSignUpArea>
            Não tem uma conta?<Link to={`/signup`} style={{marginLeft: '4px'}}>Cadastre-se</Link>
          </RedirectSignUpArea>
        </form>
      </PageArea>
    </PageContainer>
  );
}
