import { Link, useNavigate } from 'react-router-dom';
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from '../../components/MainComponents/MainComponents';
import { PageArea, RedirectSignInArea } from './styled';
import { useState, useEffect } from 'react';
import OlxApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/authHandlers';
import { StateListItem } from '../../types';

export default function SignUp() {
  const api = OlxApi();
  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [stateList, setStateList] = useState<StateListItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates(navigate);
      setStateList(slist);
    };
    getStates();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDisabled(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Senhas não coincidem');
      setDisabled(false);
      return;
    }
    const json = await api.register(
      { name, email, password, state: stateLoc },
      navigate
    );
    console.log(json);
    if (json.error) {
      setError(json.error);
      setDisabled(false);
    } else {
      doLogin(json.token);
      navigate('/');
    }
  };

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className='area'>
            <div className='area--title'>Nome Completo</div>
            <div className='area--input'>
              <input
                type='text'
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>
          <label className='area'>
            <div className='area--title'>Estado</div>
            <div className='area--input'>
              <select
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                <option value=''></option>
                {stateList.map((s, k) => (
                  <option key={k} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className='area'>
            <div className='area--title'>Email</div>
            <div className='area--input'>
              <input
                type='email'
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className='area'>
            <div className='area--title'>Senha</div>
            <div className='area--input'>
              <input
                type='password'
                required
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <label className='area'>
            <div className='area--title'>Confirmar Senha</div>
            <div className='area--input'>
              <input
                type='password'
                required
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
          <label className='area'>
            <div className='area--title'></div>
            <div className='area--input'>
              <button type='submit' disabled={disabled}>
                Cadastrar
              </button>
            </div>
          </label>
          <RedirectSignInArea>
            Já possui uma conta?<Link to={`/signin`} style={{marginLeft: '4px'}}>Entrar</Link>
          </RedirectSignInArea>
        </form>
      </PageArea>
      <Link to={`/`}>Home</Link>
    </PageContainer>
  );
}
