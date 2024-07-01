import {
  HeaderArea,
  HeaderIconLabel,
  HeaderIconLabelContainer,
} from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { doLogout, isLogged } from '../../../helpers/authHandlers';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header() {
  let logged = isLogged();
  const navigate = useNavigate();

  const handleLogout = () => {
    doLogout();
    navigate('/');
  };

  return (
    <HeaderArea>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            {/* SEP - SUA ENCOMENDA PREFERIDA */}
            <span className='logo-1'>S</span>
            <span className='logo-2'>E</span>
            <span className='logo-3'>P</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>
                <HeaderIconLabelContainer>
                  <WorkOutlineIcon />
                  <HeaderIconLabel>Plano Profissional</HeaderIconLabel>
                </HeaderIconLabelContainer>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <HeaderIconLabelContainer>
                  <ChatBubbleOutlineIcon />
                  <HeaderIconLabel>Chat</HeaderIconLabel>
                </HeaderIconLabelContainer>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <HeaderIconLabelContainer>
                  <NotificationsNoneIcon />
                  <HeaderIconLabel>Notificações</HeaderIconLabel>
                </HeaderIconLabelContainer>
              </Link>
            </li>
            {logged && (
              <>
                <li>
                  <Link to='/'>
                    <HeaderIconLabelContainer>
                      <GridViewIcon />
                      <HeaderIconLabel>Meus Anúncios</HeaderIconLabel>
                    </HeaderIconLabelContainer>
                  </Link>
                </li>
                <li>
                  <Link to='/my-account'>Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to='/post-an-ad' className='button'>
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}
            {!logged && (
              <>
                <li className='signin'>
                  <Link to='/signin'>Entrar</Link>
                </li>
                <li className='signup'>
                  <Link to='/signup' style={{ color: '#fff' }}>
                    Cadastrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
}
