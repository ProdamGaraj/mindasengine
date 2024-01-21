import ShowMore from "react-show-more-button";
import { useEffect, useState, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

export const ShowMoreContent = (props) => {
  const [state, setState] = useState({
    button: true,
    showMore: false,
    textHeight: 0,
    strN: 0,
    index: `${props.i}`,
    height: "100px",
    transition: "0.7s",

  });

  const blockRef = useRef(null);
  const textDivRef = useRef(null);
  const [fontSize, setFontSize] = useState(18.5);

  useEffect(() => {
    const handleFontSizeChange = () => {
      if (blockRef.current) {
        const computedStyle = window.getComputedStyle(blockRef.current);
        const fontSizeValue = parseFloat(
          computedStyle.getPropertyValue("line-height")
        );
        setFontSize(fontSizeValue);
      }
    };

    handleFontSizeChange(); // Вызываем при монтировании, чтобы получить начальное значение font-size
    window.addEventListener("resize", handleFontSizeChange); // Добавляем слушатель на изменение размеров окна
    return () => {
      window.removeEventListener("resize", handleFontSizeChange); // Удаляем слушатель при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    const handleHeightChange = () => {
      if (textDivRef.current) {
        const height = textDivRef.current.offsetHeight;
        setState({ ...state, textHeight: height });
      }
    };

    handleHeightChange(); // Вызываем при монтировании, чтобы получить начальное значение font-size
    window.addEventListener("resize", handleHeightChange); // Добавляем слушатель на изменение размеров окна
    return () => {
      window.removeEventListener("resize", handleHeightChange); // Удаляем слушатель при размонтировании компонента
    };
  }, []);

  // state.height > 54 ? console.log('opa') : console.log('more');
  return (
    <>
      {/*
        // Math.round(props.height / fontSize - 2) * fontSize //- это у нас максимальное значение высоты, которое может быть отображено

        // ref={textDivRef} // это div, который нужен для получения высоты всего текста (даже невидимой его части)

        // state.textHeight > Math.round(props.height / fontSize - 2) * fontSize  // это выражение сравнение, где высота текста (в нашем случае textDivRef) сравнивается с максимально возможной отрисованной высотой
       */}

      <p
        ref={blockRef}
        className="content__text"
        style={
          state.textHeight > props.height
            ? state.showMore
              ? {
                  height: state.textHeight + "px",
                  overflow: "hidden",
                  transition: `height ${state.transition} ease`,
                }
              : {
                  height:
                    Math.round(props.height / fontSize - 2) * fontSize + "px",
                  overflow: "hidden",
                  transition: `height ${state.transition} ease`,
                }
            : {
                // maxHeight:
                //   Math.round(props.height / fontSize - 2) * fontSize + "px",
                //   overflow: "hidden",
              }
        }
      >
        <div ref={textDivRef}>{props.content}</div>
      </p>
      {state.textHeight > Math.round(props.height / fontSize - 2) * fontSize &&
      state.textHeight > props.height ? (
        <>
          <div
            className="flex showMore__btn"
            style={{ justifyContent: "end", marginTop: "15px" }}
          >
            <button
              onClick={() => {
                blockRef.current.style.height = "100%";
                setState({ ...state, showMore: !state.showMore });
              }}
            >
              {!state.showMore ? (
                "Показать всю новость"
              ) : (
                <Link
                  to={state.index}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={700}
                  onClick={() => {
                    setState({ ...state, showMore: !state.showMore });
                  }}
                >
                  Скрыть новость
                </Link>
              )}
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
