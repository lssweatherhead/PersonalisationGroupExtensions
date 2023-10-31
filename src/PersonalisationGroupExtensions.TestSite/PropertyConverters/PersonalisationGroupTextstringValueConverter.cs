using Newtonsoft.Json;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.PropertyEditors.DeliveryApi;

namespace PersonalisationGroupExtensions.TestSite.PropertyConverters
{
    public class PersonalisationGroupTextstringValueConverter : PropertyValueConverterBase, IDeliveryApiPropertyValueConverter
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

        // cached until the element itself is modified
        public PropertyCacheLevel GetDeliveryApiPropertyCacheLevel(IPublishedPropertyType propertyType) => PropertyCacheLevel.Element;

        public Type GetDeliveryApiPropertyValueType(IPublishedPropertyType propertyType) => typeof(string);

        public object? ConvertIntermediateToDeliveryApiObject(
            IPublishedElement owner,
            IPublishedPropertyType propertyType,
            PropertyCacheLevel referenceCacheLevel,
            object? inter,
            bool preview,
            bool expanding)
        {
            if (inter is null)
            {
                return "";
            }

            if (inter is not IEnumerable<PersonalisationMapping> allValues || !allValues.Any())
            {
                return "";
            }

            var groupName = "";
            var defaultValue = allValues.First().Textstring;

            return allValues.FirstOrDefault(x => x.Group == groupName)?.Textstring ?? defaultValue;
        }
    }

    public class PersonalisationMapping
    {
        public string? Textstring { get; set; }
        public string? Group { get; set; }
    }
}
