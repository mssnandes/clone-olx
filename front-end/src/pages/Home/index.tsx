import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '../../components/MainComponents/MainComponents';
import { SearchArea, PageArea } from './styled';
import { useEffect, useState } from 'react';
import OlxApi from '../../helpers/OlxApi';
import { CategoryList, PropsAdItem, StateListItem } from '../../types';
import AdItem from '../../components/partials/AdItem/AdItem';

export default function Home() {
  const api = OlxApi();
  const navigate = useNavigate();

  const [stateList, setStateList] = useState<StateListItem[]>([]);
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [adList, setAdList] = useState<PropsAdItem[]>([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates(navigate);
      setStateList(slist);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories(navigate);
      setCategories(cats);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds(
        {
          sort: 'desc',
          limit: 8,
        },
        navigate
      );
      setAdList(json.ads);
    };
    getRecentAds();
  }, []);

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className='searchBox'>
            <form action='/ads' method='GET'>
              <input type='text' name='q' placeholder='O que você procura?' />
              <select name='state'>
                <option value=''></option>
                {stateList.map((s, k) => (
                  <option key={k} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className='categoryList'>
            {categories.map((i, k) => (
              <Link key={k} to={`/ads?cat=${i.slug}`} className='categoryItem'>
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Mais Recentes</h2>
          <div className='list'>
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to={`/ads`} className='seeAllLink'>Ver todos</Link>
        </PageArea>
      </PageContainer>
    </>
  );
}
