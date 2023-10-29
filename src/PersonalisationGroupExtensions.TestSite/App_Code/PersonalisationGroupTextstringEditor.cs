using Umbraco.Cms.Core.PropertyEditors;

namespace PersonalisationGroupExtensions.TestSite.App_Code
{
    [DataEditor(
        alias: "PersonalisationGroupTextstringEditor",
        name: "Personalisation Group Textstring Editor",
        view: "~/App_Plugins/PersonalisationGroupEditors/PersonalisationGroupTextstringEditor/pg-textstring-editor.html",
        ValueType = ValueTypes.Json,
        Group = "Personalisation Groups",
        Icon = "icon-edit")]
    public class PersonalisationGroupTextstringEditor : DataEditor
    {
        public PersonalisationGroupTextstringEditor(IDataValueEditorFactory dataValueEditorFactory)
            : base(dataValueEditorFactory)
        {
        }
    }
}
