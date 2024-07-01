import { useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  PageContainer,
  PageTitle,
} from "../../components/MainComponents/MainComponents";
import { PageArea } from "./styled";
import { SetStateAction, useEffect, useRef, useState } from "react";
import OlxApi from "../../helpers/OlxApi";
import { CategoryList } from "../../types";
import { createNumberMask } from "text-mask-addons";
import MaskedInput from "react-text-mask";
import { returnToken } from "../../helpers/authHandlers";

export default function AddAd() {
  const api = OlxApi();
  const navigate = useNavigate();
  const fileField = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<CategoryList[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const [pImages, setPImages] = useState<string[]>([]);
  const fData = new FormData();

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories(navigate);
      setCategories(cats);
    };
    getCategories();
  }, [api, navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDisabled(true);
    setError("");

    if (!title.trim()) {
      setError("Preencha um titúlo para o anúncio");
      setDisabled(false);
      return;
    }

    if (!category) {
      setError("Selecione uma Categoria");
      setDisabled(false);
      return;
    }

    const token = returnToken();
    
    fData.append("title", title);
    fData.append("price", price);
    fData.append("priceneg", String(priceNegotiable));
    fData.append("desc", desc);
    fData.append("cat", category);

    let fields = fileField.current as HTMLInputElement;
    let files = fields.files as FileList;
    if (files.length > 0 && pImages.length !== 0) {
      for (let i in files) {
        fData.append("images", files[i]);
      }
    }

    const json = await api.addAd(fData);
    console.log(json);
    if (!json.error) {
      navigate(`/ad/${json.info.id}`);
      return;
    } else {
      setError(json.error);
    }
    setDisabled(false);
  };

  const prevImages = () => {
    let fields = fileField.current as HTMLInputElement;
    let files = fields.files as FileList;
    if (files.length > 5) {
      setError("Limite de imagens exedido");
      return;
    }

    if (files.length > 0) {
      let blobImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        if (typeof files[i] == "object") {
          let imageUrl = URL.createObjectURL(files[i]);
          blobImages.push(imageUrl);
        }
      }
      setPImages(blobImages);
    }
  };

  const cleanInputFile = () => {
    fData.delete("images");
    let fields = fileField.current as HTMLInputElement;
    fields.value = "";
    setPImages([]);
  };

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <div className="col-2">
            <label htmlFor="file" className="area">
              <div className="area--title">Adicionar Imagens</div>
              <small>máx: 5</small>
              <div className="area--input">
                <input
                  type="file"
                  disabled={disabled}
                  ref={fileField}
                  id="file"
                  multiple
                  onChange={prevImages}
                />
              </div>
            </label>

            <div className="box-images">
              {pImages.length > 0 && (
                <>
                  <div className="images">
                    {pImages.map((i, k) => (
                      <div className="image" key={k}>
                        <img src={i} alt="" />
                      </div>
                    ))}
                  </div>
                  <div className="button">
                    <button onClick={cleanInputFile}>Limpar Seleção</button>
                  </div>
                </>
              )}
              {pImages.length <= 0 && (
                <>
                  <img src="/images/no-pictures.png" alt="" />
                  <img src="/images/no-pictures.png" alt="" />
                  <img src="/images/no-pictures.png" alt="" />
                  <img src="/images/no-pictures.png" alt="" />
                  <img src="/images/no-pictures.png" alt="" />
                </>
              )}
            </div>
          </div>
          <div className="col-1">
            <label htmlFor="" className="area">
              <div className="area--title">Titulo</div>
              <div className="area--input">
                <input
                  type="text"
                  disabled={disabled}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </label>

            <label htmlFor="" className="area">
              <div className="area--title">Categoria</div>
              <div className="area--input">
                <select
                  disabled={disabled}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option></option>
                  {categories &&
                    categories.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
            </label>

            <label htmlFor="" className="area">
              <div className="area--title">Preço</div>
              <div className="area--input">
                <MaskedInput
                  mask={priceMask}
                  placeholder="R$ "
                  disabled={disabled || priceNegotiable}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </label>

            <label htmlFor="" className="area area-checkbox">
              <div className="area--title">Preço Negociável</div>
              <div className="area--input">
                <input
                  className="check-input"
                  type="checkbox"
                  disabled={disabled}
                  checked={priceNegotiable}
                  onChange={(e) => setPriceNegotiable(!priceNegotiable)}
                />
              </div>
            </label>

            <label htmlFor="" className="area">
              <div className="area--title">Descrição</div>
              <div className="area--input">
                <textarea
                  disabled={disabled}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            </label>
          </div>
        </form>
        <div className="button-area">
          <button disabled={disabled} onClick={handleSubmit}>
            Adicionar Anúncio
          </button>
        </div>
      </PageArea>
    </PageContainer>
  );
}
