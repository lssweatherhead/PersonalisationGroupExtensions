using Newtonsoft.Json;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;

namespace PersonalisationGroupExtensions.TestSite.PropertyConverters
{
    public class PersonalisationGroupTextstringValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(IPublishedPropertyType propertyType) =>
            propertyType.EditorAlias.InvariantEquals("PersonalisationGroupTextstringEditor");

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(IEnumerable<PersonalisationMapping>);

        public override object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview)
        {
            if (source is string value)
            {
                return JsonConvert.DeserializeObject<IEnumerable<PersonalisationMapping>>(value);
            }

            return base.ConvertSourceToIntermediate(owner, propertyType, source, preview);
        }
    }

    public class PersonalisationMapping
    {
        public string? Textstring { get; set; }
        public string? Group { get; set; }
    }
}
