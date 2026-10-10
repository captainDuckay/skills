import { ChangeDetectionStrategy, Component } from '@angular/core';
import { credits, repoUrl } from '../school/constants';

@Component({
  selector: 'footer[school-site-footer]',
  templateUrl: './site-footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly repoUrl = repoUrl;
  protected readonly credits = credits;
}
