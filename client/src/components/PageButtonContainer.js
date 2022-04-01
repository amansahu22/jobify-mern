import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppContext } from "../context/appContext";

const PageButtonContainer = () => {
  const { noOfPages, page, pageChange } = useAppContext();

  const pages = Array.from({ length: noOfPages }, (_, index) => {
    //_ is placeholder for item we don't have need of that so left it like this
    //array indexing starts from 0 but page number can not be zero
    return index + 1;
  });

  const prevButton = () => {
    let newPageNumber = page - 1;
    if (newPageNumber < 1) {
      //either remain on same page i.e. newPageNumber=1 or go to last page
      newPageNumber = noOfPages;
    }

    pageChange(newPageNumber);
  };

  const nextButton = () => {
    let newPageNumber = page + 1;
    if (newPageNumber > noOfPages) {
      //either remain on same page i.e. newPageNumber=noOfPages or go to first page
      newPageNumber = 1;
    }

    pageChange(newPageNumber);
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevButton}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            type="button"
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            onClick={() => pageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={nextButton}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;
