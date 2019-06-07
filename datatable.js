class SimpleDataTableWidget{


    constructor(containerID)
    {
        let objName = "dataTableExample";
        this.objName = objName;
        // language=HTML
        let dialogs = "\n" +
            "<div class=\"modal fade\" id=\"addRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addRowModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"addRowModalTitle\">CREATE CONTACT</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                <div class=\"\">\n" +
            "                    <label for=\"ownerCreateInput\">Owner</label>\n" +
            "                    <input required id=\"ownerCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                    <label for=\"ownerCreateInput\">Type</label>\n" +
            "                    <input  required id=\"typeCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                    <label for=\"ownerCreateInput\">Year Of Add</label>\n" +
            "                    <input required id=\"year_of_addCreateInput\" type=\"number\" class=\"form-control\">\n" +
            "                    <label for=\"ownerCreateInput\">Value</label>\n" +
            "                    <input required id=\"valueCreateInput\" type=\"text\" class=\"form-control\">\n" +
            "                </div>\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeAddRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickCreateContact('"+objName+"')\">Create</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"modal fade\" id=\"deleteRowsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteRowsModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"deleteRowsModalTitle\">DELETE CONTACTS</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                Are you sure you want to delete contacts?\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeDeleteRowsModalModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
            "                <button type=\"button\" class=\"btn btn-danger\" onclick=\"onClickDeleteContact('"+objName+"')\">Yes</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"modal fade\" id=\"updateRowModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"updateRowModalTitle\" aria-hidden=\"true\">\n" +
            "    <div class=\"modal-dialog modal-sm\" role=\"document\">\n" +
            "        <div class=\"modal-content\">\n" +
            "            <div class=\"modal-header\">\n" +
            "                <h5 class=\"modal-title\" id=\"updateRowModalTitle\">UPDATE CONTACT</h5>\n" +
            "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "                    <span aria-hidden=\"true\">&times;</span>\n" +
            "                </button>\n" +
            "            </div>\n" +
            "            <div class=\"modal-body\">\n" +
            "                <label for=\"ownerCreateInput\">Owner</label>\n" +
            "                <input required id=\"ownerUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <label for=\"ownerCreateInput\">Type</label>\n" +
            "                <input  required id=\"typeUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <label for=\"ownerCreateInput\">Year of Add</label>\n" +
            "                <input required id=\"year_of_addUpdateInput\" type=\"number\" class=\"form-control\">\n" +
            "                <label for=\"ownerCreateInput\">Value</label>\n" +
            "                <input required id=\"valueUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "                <input hidden required id=\"keyUpdateInput\" type=\"text\" class=\"form-control\">\n" +
            "\n" +
            "            </div>\n" +
            "            <div class=\"modal-footer\">\n" +
            "                <button id=\"closeUpdateRowModal\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n" +
            "                <button type=\"button\" class=\"btn btn-primary\" onclick=\"onClickUpdateSaveContact('"+objName+"')\">Save</button>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n";
        let thisObj = this;
        this.containerID = containerID;
        $("html").append(dialogs);
        this.allContacts = [];
        this.displayContacts = [];
        this.sortField = null;
        this.isDescSort = false;
        this.filter = '';
        this.currentPage = 0;
        this.displayPagesCount = 0;
        this.rowsOnPage = 5;
        this.maxDisplayPages = 10;
        this.dbUrl = 'http://localhost:3000';

        this.contactFields = ['owner','type','value','year_of_add'];

        this.createInputOwner = $('#ownerCreateInput');
        this.createInputType = $('#typeCreateInput');
        this.createInputYearOfAdd = $('#year_of_addCreateInput');
        this.createInputValue = $('#valueCreateInput');

        this.updateInputOwner = $('#ownerUpdateInput');
        this.updateInputType = $('#typeUpdateInput');
        this.updateInputYearOfAdd = $('#year_of_addUpdateInput');
        this.updateInputValue = $('#valueUpdateInput');
        this.updateInputKey = $('#keyUpdateInput');


        this.filterBy();
        this.sortByField();
        this.renderWidget();
    }

    createContact(owner, type, year_of_add, value) {
        let newContact = {
            owner : owner,
            type: type,
            year_of_add : year_of_add,
            value: value
        };
        $.post(this.dbUrl + '/contact', newContact)
            .done((data, status) => {
                console.log({data: data, status: status});
                this.refresh();
            });
    }

    updateContact(key,owner, type, year_of_add, value)
    {
        let newContact = {
            owner : owner,
            type: type,
            year_of_add : year_of_add,
            value: value
        };

        $.ajax({
            url: this.dbUrl + '/contact/' + key,
            method: 'PUT',
            data: newContact,
            success: (result)=>{
                this.refresh();
            },
        });
    }


    deleteContact(key)
    {
         $.ajax({
            url: this.dbUrl + '/contact/' + key,
            method: 'DELETE',
            success: (result)=>{
                this.refresh();
            },
        });
    }

    renderWidget()
    {
        let objectName = "dataTableExample";
        let container = $(this.containerID);
        container.html('');

        let searchDiv = $('<div class="form-group row" style="margin: 20px 0 10px 10px">');
        searchDiv.append('<label for="searchInput" class="col-sm-1 col-form-label">Search</label>');
        searchDiv.append(
            $('<div class="col-sm-4">').append(
                $('<input id="searchInput" class="form-control" onchange="onClickFilter(\''+objectName+'\');">').val(this.filter)
            )
        );
        container.append(searchDiv);
        //control buttons
        let controlPanel = $('<div style="margin: 10px 20px 10px 3px">');
        controlPanel.append($('<button  type="button" class="btn btn-success" data-toggle="modal" data-target="#addRowModal" style=" color: white">').text('Create'));
        controlPanel.append($('<button class="btn btn-warning" data-toggle="modal" data-target="#deleteRowsModal" style=" margin-left: 10px ;">').text('Delete Selected'));
        controlPanel.append($('<button class="btn btn-info" style=" margin-left: 10px ;">').text('Refresh').click(()=>{
            window[this.objName].refresh();
        }));        
        controlPanel.append($('<button hidden id="updateButton" data-toggle="modal" data-target="#updateRowModal">').text('Update'));
        container.append(controlPanel);
        container.append($('<div>').text('Amount: ' + this.displayContacts.length));
        let tableHtml = $('<table class="table table-striped">');
        //headers
        let header = $('<tr>');
        header.append($('<th>').html('<i class="fas fa-trash"></i>'));
        header.append($('<th>').text('#'));
        for(let i =0;i<this.contactFields.length;i++)
        {
            let a = $('<a href="#">').click({param1:objectName},onClickSortByField).text(this.contactFields[i]);
            if(this.contactFields[i] === this.sortField)
            {
                a = $('<b>').append(a).append(this.isDescSort?' <i class="fas fa-sort-amount-down"></i>':' <i class="fas fa-sort-amount-up"></i>');
            }else{
                a = $('<span>').append(a).append(' <i class="fas fa-sort" style="color: rgba(133,133,133,0.31)"></i>');
            }
            header.append($('<th>').append(a))
        }
        header.append($('<th>').html('<i class="fas fa-pencil-alt"></i>'));
        tableHtml.append(header);
        //table data
        let firstDisplayI = (this.currentPage) * this.rowsOnPage;
        let lastDisplayI = ((this.currentPage) * this.rowsOnPage + this.rowsOnPage < this.displayContacts.length)? (this.currentPage) * this.rowsOnPage + this.rowsOnPage: this.displayContacts.length;
        for(let i =  firstDisplayI;i<lastDisplayI;i++)
        {
            let rowHtml = $('<tr>');
            rowHtml.append($('<td>').html('<input type="checkbox" name="type" value="'+this.displayContacts[i]._id+'" />'));
            rowHtml.append($('<td>').text(i));
            for(let j =0;j<this.contactFields.length;j++)
            {
                rowHtml.append(
                    $('<td>').text(this.displayContacts[i][this.contactFields[j]])
                );
            }
            rowHtml.append($('<td>').append($('<a href="#" class="fas fa-pen">').click({param1:i,param2:objectName},onClickUpdateContact)));
            rowHtml.append( $('<td id="key' + i + '" hidden>').text(this.displayContacts[i]._id));
            tableHtml.append(rowHtml);
        }
        container.append(tableHtml);
        //pages buttons
        let pagination = $('<div class="col-md-12" style="margin: 10px">');
        let allPagesCount = Math.ceil((this.displayContacts.length ) / this.rowsOnPage);
        this.displayPagesCount = (allPagesCount > this.maxDisplayPages)? this.maxDisplayPages : allPagesCount;
        let firstDisplayPage = 0;
        let lastDisplayPage = this.displayPagesCount;
        if(allPagesCount > this.maxDisplayPages)
        {
            if(this.currentPage - Math.trunc(this.maxDisplayPages/2) < 0)
            {
                firstDisplayPage = 0;
                lastDisplayPage = this.maxDisplayPages;
            }
            else if(this.currentPage + Math.trunc(this.maxDisplayPages/2) > allPagesCount)
            {
                firstDisplayPage = allPagesCount - 10;
                lastDisplayPage = allPagesCount;
            }else{
                firstDisplayPage = this.currentPage - Math.trunc(this.maxDisplayPages/2);
                lastDisplayPage = this.currentPage + Math.trunc(this.maxDisplayPages/2);
            }
        }

        for(let i = firstDisplayPage;i<lastDisplayPage;i++)
        {
            let enable = 'enable';
            if(i === this.currentPage)
                enable = 'disabled';
            let button = $('<button ' + enable +' class="btn btn-sm btn-secondary" style="margin: 2px 10px 10px 0; width: 40px; height: 40px;">').text(i+1);
            button.click({param1:objectName},onSwitchPageClick);
            pagination.append(button);
        }
        container.append(pagination);


    }
    refresh() {
       this.downloadData(() => {
            this.filterBy();
            this.sortByField();
            this.renderWidget();
        });
    }

    sortByField()
    {
        if(this.sortField !== null)
        {
            if(typeof this.allContacts[0][this.sortField] === "number")
            {
                if(this.isDescSort)
                {
                    this.displayContacts = this.displayContacts.sort((a,b) =>{
                        return a[this.sortField] - b[this.sortField];
                    });
                }else{
                    this.displayContacts = this.displayContacts.sort((a,b) => {
                        return b[this.sortField] - a[this.sortField];
                    });
                }

            }else{
                if(this.isDescSort)
                {
                    this.displayContacts = this.displayContacts.sort((a,b) => {
                        return -a[this.sortField].localeCompare(b[this.sortField])
                    });
                }else{
                    this.displayContacts = this.displayContacts.sort( (a,b)=>{

                        return a[this.sortField].localeCompare(b[this.sortField])
                    });
                }

            }

        }
    }

    filterBy()
    {
        if(this.filter !== '')
        {
            this.displayContacts = this.allContacts.filter( (value)=>{
                return value.value.indexOf(this.filter) !== -1
                    || value.owner.indexOf(this.filter) !== -1
                    || value.type.indexOf(this.filter) !== -1
                    || (value.year_of_add+'').indexOf(this.filter) !== -1
            });
        }else
            this.displayContacts = this.allContacts.slice(0);
    }
    
    downloadData(done) {
        $.get(this.dbUrl + '/contact', (data, status) => {
            console.log({data: data, status: status});
            this.allContacts = data;
            done();
        });
    }
}

function onSwitchPageClick(objName)
{
    let datatableonj = window[objName.data.param1];
    datatableonj.currentPage = parseInt(this.innerText) - 1;
    console.log(this);
    datatableonj.renderWidget();
}

function onClickFilter(objName)
{
    let datatableonj = window[objName];
    datatableonj.filter = $('#searchInput').val();
    console.log(datatableonj.filter);
    datatableonj.filterBy();
    datatableonj.renderWidget();
}
function onClickSortByField(objName)
{
    let datatableonj = window[objName.data.param1];
    let oldSortField = datatableonj.sortField;
    datatableonj.sortField = this.innerText;
    if(oldSortField === datatableonj.sortField) {
        datatableonj.isDescSort = !datatableonj.isDescSort;
    }else{
        datatableonj.isDescSort = false;
    }
    datatableonj.sortByField();
    datatableonj.renderWidget();
}

function onClickCreateContact(objName)
{
    let datatableonj = window[objName];
    let owner = datatableonj.createInputOwner.val();
    let type = datatableonj.createInputType.val();
    let year_of_add = datatableonj.createInputYearOfAdd.val();
    let value = datatableonj.createInputValue.val();
    if(owner === '' || type === '' || year_of_add === '' || value === '')
        return;
    datatableonj.createContact(owner,type,parseInt(year_of_add),value);

    $('#closeAddRowModal').click();

    datatableonj.createInputOwner.val('');
    datatableonj.createInputType.val('');
    datatableonj.createInputYearOfAdd.val('');
    datatableonj.createInputValue.val('');

}

function onClickDeleteContact(objName) {
    let datatableonj = window[objName];
    let selected = [];

    $("input:checkbox[name=type]:checked").each(function() {
        selected.push($(this).val());
    });
    selected.forEach(function (value) {
        datatableonj.deleteContact(value);
    });
    $('#closeDeleteRowsModalModal').click();
}

function onClickUpdateContact(event) {
    let index = event.data.param1;
    let datatableonj = window[event.data.param2];
    $('#updateButton').click();
    datatableonj.updateInputOwner.val(datatableonj.displayContacts[index].owner);
    datatableonj.updateInputType.val(datatableonj.displayContacts[index].type);
    datatableonj.updateInputYearOfAdd.val(datatableonj.displayContacts[index].year_of_add);
    datatableonj.updateInputValue.val(datatableonj.displayContacts[index].value);
    datatableonj.updateInputKey.val(datatableonj.displayContacts[index]._id);
}

function onClickUpdateSaveContact(objName) {
    let datatableonj = window[objName];
    let owner = datatableonj.updateInputOwner.val();
    let type = datatableonj.updateInputType.val();
    let year_of_add = datatableonj.updateInputYearOfAdd.val();
    let value = datatableonj.updateInputValue.val();
    let key = datatableonj.updateInputKey.val();

    if(owner === '' || type === '' || year_of_add === '' || value === '')
        return;
    datatableonj.updateContact(key,owner,type,parseInt(year_of_add),value);

    $('#closeUpdateRowModal').click();

    datatableonj.updateInputOwner.val('');
    datatableonj.updateInputType.val('');
    datatableonj.updateInputYearOfAdd.val('');
    datatableonj.updateInputValue.val('');
}