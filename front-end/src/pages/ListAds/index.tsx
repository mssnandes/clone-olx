import * as C from "./styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OlxApi from "../../helpers/OlxApi";
import { PageContainer } from "../../components/MainComponents/MainComponents";
import AdItem from "../../components/partials/AdItem/AdItem";
import { PageArea } from "./styled";
import { CategoryList, StateList } from "../../types";
import GridViewIcon from "@mui/icons-material/GridView";

// Timer for search Request (created out component for disable loop )
let timer: NodeJS.Timeout;

export default function ListAds() {
  const api = OlxApi();
  const navigate = useNavigate();
  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQueryString();

  const [q, setQ] = useState(
    query.get("q") == null ? "" : (query.get("q") as string)
  );
  const [cat, setCat] = useState(
    query.get("cat") == null ? "" : (query.get("cat") as string)
  );
  const [stateUser, setState] = useState(
    query.get("state") == null ? "" : (query.get("state") as string)
  );

  const [adsTotal, setAdsTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<number[]>([]);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [seeCat, setSeeCat] = useState("none");

  const getAdsList = async () => {
    setLoading(true);
    let offset = (currentPage - 1) * 9;
    const json = await api.getAds(
      {
        sort: "desc",
        limit: 9,
        q,
        category: cat,
        state: stateUser,
        offset,
      },
      navigate
    );
    setAdList(json.ads);
    setAdsTotal(json.ads.length);
    setLoading(false);
    setOpacity(1);
  };

  useEffect(() => {
    setPageCount(adList.length > 0 ? Math.ceil(adsTotal / 9) : 0);
    setCurrentPage(1);
  }, [adsTotal]);

  useEffect(() => {
    const newPagination = Array.from(
      { length: pageCount },
      (_, index) => index + 1
    );
    setPagination(newPagination);
  }, [pageCount]);

  useEffect(() => {
    setOpacity(0.5);
    clearTimeout(timer);
    let queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (stateUser) {
      queryString.push(`state=${stateUser}`);
    }
    navigate(`?${queryString.join("&")}`, { replace: true });

    timer = setTimeout(() => {
      getAdsList();
    }, 2000);
  }, [q, cat, stateUser, currentPage]);

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates(navigate);
      setStateList(sList);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const catList = await api.getCategories(navigate);
      setCategories(catList);
    };
    getCategories();
  }, []);

  return (
    <PageContainer>
      <PageArea seeCat={seeCat}>
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura ?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select
              name="state"
              id=""
              value={stateUser}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Selecione um Estado</option>
              {stateList.map((i: StateList, k) => (
                <option key={k} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((i: CategoryList, k) => (
                <li
                  key={k}
                  className={
                    cat == i.slug ? "categoryItem active" : "categoryItem"
                  }
                  onClick={() => setCat(i.slug)}
                >
                  <img src={i.img} alt="" />
                  <span>{i.name}</span>
                </li>
              ))}
              <div
                className="arrow-down"
                onClick={(e) => setSeeCat(seeCat == "none" ? "flex" : "none")}
              >
                <img src="/img/arrow-down.png" alt="" />
              </div>
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados</h2>

          {loading && adList.length === 0 && (
            <div className="listWarning">Carregando...</div>
          )}

          {!loading && adList.length === 0 && (
            <div className="listWarning" style={{ opacity }}>
              Nenhum resultado correspondente
            </div>
          )}

          <div className="list" style={{ opacity }}>
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>

          <div className="pagination">
            {pagination &&
              pagination.map((i, k) => (
                <div
                  key={k}
                  onClick={() => setCurrentPage(i)}
                  className={i === currentPage ? "pageItem active" : "pageItem"}
                >
                  {i}
                </div>
              ))}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
}
