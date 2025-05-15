import ExpoModulesCore

public class ExpoAlternateIconsModule: Module {
    private var supportsAlternateIcons = UIApplication.shared.supportsAlternateIcons;

    public func definition() -> ModuleDefinition {
        Name("ExpoAlternateIcons")

        Constants({
          return [
            "supportsAlternateIcons": self.supportsAlternateIcons
          ]
        })

        AsyncFunction("setIcon", setIcon)
        Function("getIconName", getIconName)
    }

    private func getIconName() -> String? {
        return UIApplication.shared.alternateIconName;
    }

    private func setIcon(icon: String?, promise: Promise) -> Void {
        Task { @MainActor in
            do {
                try await UIApplication.shared.setAlternateIconName(icon);

                promise.resolve(icon);
            } catch {
                promise.reject(error);
            }
        }
    }
}
