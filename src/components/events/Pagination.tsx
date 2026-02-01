import React from 'react';
import '../../styles/events.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalCount,
    pageSize,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        pages.push(1);

        if (startPage > 2) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="pagination-container">
            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
            >
                <ChevronLeft size={20} />
            </button>
            {visiblePages.map((page, index) => (
                typeof page === 'number' ? (
                    <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={`separator-${index}`} className="pagination-separator">...</span>
                )
            ))}
            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
