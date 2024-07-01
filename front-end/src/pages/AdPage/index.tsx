import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../../components/MainComponents/MainComponents";
import { PageArea, Fake, PriceArea } from "./styled";
import { useEffect, useState } from "react";
import OlxApi from "../../helpers/OlxApi";
import { AdInfoList } from "../../types";
import { DateFormat } from "../../utils/DateUtils";
import PriceTag from "../../components/partials/PriceTag";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from "../../components/partials/Carousel";
import ContactForm from "../../components/partials/ContactForm";

export default function AdPage() {
  const api = OlxApi();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState<AdInfoList>({});

  useEffect(() => {
    const getAdInfo = async (adId: string | undefined) => {
      const json = await api.getAd(adId, true, navigate);
      setAdInfo(json);
      setLoading(false);
    };
    getAdInfo(id);
  }, [api, id, navigate]);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adName">
              {loading && <Fake height={20} />}
              {adInfo.title && <h2>{adInfo.title}</h2>}
              {adInfo.dateCreated && (
                <small className="adCreated">
                  Publicado em {DateFormat(adInfo.dateCreated)}
                </small>
              )}
            </div>
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && <ImageCarousel adInfo={adInfo} />}
            </div>
            <div className="adInfo">
              <div className="adPrice">{loading && <Fake height={20} />}</div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding" style={{ backgroundColor: "none" }}>
            {loading && <Fake height={20} />}
            <PriceArea>
              {adInfo.price &&
                adInfo.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
            </PriceArea>
          </div>
          <div className="box box--padding">
            {loading && <Fake height={50} />}
            <ContactForm />
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
}
