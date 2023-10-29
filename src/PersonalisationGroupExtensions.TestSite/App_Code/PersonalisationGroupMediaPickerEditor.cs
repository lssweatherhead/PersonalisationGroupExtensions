using Umbraco.Cms.Core.PropertyEditors;

namespace PersonalisationGroupExtensions.TestSite.App_Code
{
    [DataEditor(
        alias: "PersonalisationGroupMediaPickerEditor",
        name: "Personalisation Group Media Picker Editor",
        view: "~/App_Plugins/PersonalisationGroupEditors/PersonalisationGroupMediaPickerEditor/pg-mediapicker-editor.html",
        Group = "Personalisation Groups",
        Icon = "icon-picture")]
    public class PersonalisationGroupMediaPickerEditor : DataEditor
    {
        public PersonalisationGroupMediaPickerEditor(IDataValueEditorFactory dataValueEditorFactory)
            : base(dataValueEditorFactory)
        {
        }
    }
}
