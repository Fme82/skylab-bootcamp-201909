function Search(container){
    Component.call(this, container);
}

Search.extend(Component);

Search.prototype.onSubmit = function (expression) {
    this.container.addEventListener('submit', function (event) {
        event.preventDefault();
        var query = this.search.value;
        expression(query);
        this.search.value = "";
    });
};