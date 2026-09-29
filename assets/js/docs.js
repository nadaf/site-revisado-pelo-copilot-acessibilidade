(() => {
    const searchInput = document.querySelector('#document-search');
    const categorySelect = document.querySelector('#document-category');
    const entries = [...document.querySelectorAll('.doc-entry')];
    const count = document.querySelector('#document-count');
    const emptyMessage = document.querySelector('#archive-empty');

    if (!searchInput || !categorySelect || !count || !emptyMessage) return;

    const updateDocuments = () => {
        const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
        const category = categorySelect.value;
        let visibleCount = 0;

        entries.forEach((entry) => {
            const matchesQuery = `${entry.dataset.search} ${entry.textContent}`.toLocaleLowerCase('pt-BR').includes(query);
            const matchesCategory = category === 'all' || entry.dataset.category === category;
            const isVisible = matchesQuery && matchesCategory;
            entry.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        count.textContent = `${visibleCount} ${visibleCount === 1 ? 'documento' : 'documentos'}`;
        emptyMessage.hidden = visibleCount > 0;
    };

    searchInput.addEventListener('input', updateDocuments);
    categorySelect.addEventListener('change', updateDocuments);
})();