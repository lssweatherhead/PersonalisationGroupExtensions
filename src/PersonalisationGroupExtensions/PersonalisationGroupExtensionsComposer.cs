using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Umbraco.Community.PersonalisationGroupExtensions
{
    internal class PersonalisationGroupExtensionsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.ManifestFilters().Append<PersonalisationGroupExtensionsManifestFilter>();
        }
    }
}
