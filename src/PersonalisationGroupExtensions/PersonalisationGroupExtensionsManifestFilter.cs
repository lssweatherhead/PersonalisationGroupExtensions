using Umbraco.Cms.Core.Manifest;

namespace Umbraco.Community.PersonalisationGroupExtensions
{
    internal class PersonalisationGroupExtensionsManifestFilter : IManifestFilter
    {
        public void Filter(List<PackageManifest> manifests)
        {
            var assembly = typeof(PersonalisationGroupExtensionsManifestFilter).Assembly;

            manifests.Add(new PackageManifest
            {
                PackageName = "PersonalisationGroupExtensions",
                Version = assembly.GetName()?.Version?.ToString(3) ?? "0.1.0",
                AllowPackageTelemetry = true,
                Scripts = new string[] {
                    // List any Script files
                    // Urls should start '/App_Plugins/PersonalisationGroupExtensions/' not '/wwwroot/PersonalisationGroupExtensions/', e.g.
                    // "/App_Plugins/PersonalisationGroupExtensions/Scripts/scripts.js"
                },
                Stylesheets = new string[]
                {
                    // List any Stylesheet files
                    // Urls should start '/App_Plugins/PersonalisationGroupExtensions/' not '/wwwroot/PersonalisationGroupExtensions/', e.g.
                    // "/App_Plugins/PersonalisationGroupExtensions/Styles/styles.css"
                }
            });
        }
    }
}
