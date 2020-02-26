var elem = document.getElementById("generate");
elem.onclick = function () {
var doc = new jsPDF();
doc.autoTable({
    html: '#table',
    didDrawCell: function (data) {
        if (data.column.dataKey === 5 && data.cell.section === 'body') {
            doc.autoTable({
                head: [["One", "Two", "Three", "Four"]],
                body: [
                    ["1", "2", "3", "4"],
                    ["1", "2", "3", "4"],
                    ["1", "2", "3", "4"],
                    ["1", "2", "3", "4"]
                ],
                startY: data.cell.y + 2,
                margin: {left: data.cell.x + data.cell.padding('left')},
                tableWidth: 'wrap',
                theme: 'grid',
                styles: {
                    fontSize: 7,
                    cellPadding: 1,
                }
            });
        }
    },
    columnStyles: {
        5: {cellWidth: 40}
    },
    bodyStyles: {
        minCellHeight: 30
    }
});
doc.save('table.pdf');
};
